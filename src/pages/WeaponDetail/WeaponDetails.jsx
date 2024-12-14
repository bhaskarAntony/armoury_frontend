import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './style.css';

function WeaponDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [weapon, setWeapon] = useState(null);
    const [isIssuing, setIsIssuing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [purpose, setPurpose] = useState('');
    const [weaponUsed, setWeaponUsed] = useState('false'); // New state for dropdown

    useEffect(() => {
        // Fetch weapon details by ID
        axios.get(`https://armoury-backend-ti9n.onrender.com/api/weapons/single/${id}`)
            .then(response => setWeapon(response.data))
            .catch(error => console.error('Error fetching weapon details:', error));
    }, [id]);

    const handleIssueWeapon = () => {
        if (weapon.status !== 'In Service') {
            alert('Weapon is not available for issue.');
            return;
        }

        setIsIssuing(true);
        axios.post(`https://armoury-backend-ti9n.onrender.com/api/transactions/issue/fixed/weapon/${id}`)
            .then(response => {
                alert('Weapon issued successfully!');
                navigate('/manage/weapons');
            })
            .catch(error => {
                console.error('Error issuing weapon:', error);
                alert('Failed to issue weapon.');
            })
            .finally(() => setIsIssuing(false));
    };

    const handleTakeWeapon = () => {
        if (weapon.status !== 'issued') {
            alert('Weapon is not issued to anyone.');
            return;
        }

        setShowModal(true); // Show the confirmation modal
    };

    const handleReturnWeapon = () => {
        // Check if weapon was used and if purpose is provided
        if (weaponUsed === 'true' && !purpose) {
            alert('Please provide a purpose.');
            return;
        }
    
        // Proceed with the API call
        setIsIssuing(true);
        axios.patch(`https://armoury-backend-ti9n.onrender.com/api/transactions/take/fixed/weapon/${id}`, {
            used: weaponUsed === 'true',  // Convert 'true'/'false' string to boolean
            purpose: purpose
        })
        .then(response => {
            alert('Weapon returned successfully!');
            setShowModal(false); // Close modal on success
            navigate('/manage/weapons');
        })
        .catch(error => {
            console.error('Error returning weapon:', error);
            alert('Failed to return weapon.');
        })
        .finally(() => setIsIssuing(false));
    };
    

    if (!weapon) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h3 className="text-white">Weapon Details</h3>
            <div className="weapon-detail-card dashboard-card p-3">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <img 
                            src={weapon.image || '/placeholder.jpg'} 
                            alt="Weapon" 
                            className="weapon-detail-img w-100 rounded-4"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="weapon-detail-body text-white">
                            <h5 className='fs-1'>{weapon.type}</h5>
                            <p>Register Number: {weapon.registerNumber}</p>
                            <p>Status: {weapon.status}</p>
                            <p>Rack Number: {weapon.rackNumber || 'N/A'}</p>
                            <p>Last Audit By: {weapon.lastAuditBy || 'N/A'}</p>
                            <p>Upcoming Maintenance Date: {weapon.upcomingMaintenanceDate || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="officer d-flex align-items-center gap-3 p-3 mt-4 rounded-3 border text-white">
                            <img src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" alt="profile" />
                            <div>
                                <h1 className="fs-3">Weapon is fixed to {weapon.fixedToOfficer.officername}</h1>
                                <p className="fs-5">Officer Rank: {weapon.fixedToOfficer.rank}</p>
                                <p className="fs-5">Officer Metal No: {weapon.fixedToOfficer.metalno}</p>

                                {
                                    weapon.status !== 'issued' ? (
                                        <button
                                            className="g-btn px-5 mt-3"
                                            onClick={handleIssueWeapon}
                                            disabled={isIssuing}
                                        >
                                            {isIssuing ? 'Issuing...' : `Issue Weapon to ${weapon.fixedToOfficer.officername}`}
                                        </button>
                                    ) : (
                                        <button
                                            className="g-btn px-5 mt-3"
                                            onClick={handleTakeWeapon}
                                            disabled={isIssuing}
                                        >
                                            {isIssuing ? 'Returning...' : `Take Weapon from ${weapon.fixedToOfficer.officername}`}
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Return Weapon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="formUsed">
                        <Form.Label>Weapon Used?</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={weaponUsed} 
                            onChange={(e) => setWeaponUsed(e.target.value)}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPurpose">
                        <Form.Label>Purpose</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Enter the purpose for returning the weapon" 
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                    </Form.Group>

                   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='rounded-pill' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <button className='g-btn' onClick={handleReturnWeapon}>
                        Return Weapon
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default WeaponDetail;
