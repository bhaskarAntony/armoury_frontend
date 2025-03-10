import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './style.css'

function NewWeapon() {
    const [weaponData, setWeaponData] = useState({
        type: '',
        registerNumber: '',
        buttno: '',
        status: 'In Service',
        fixedToOfficer: { rank: '', metalno: '', officername: '' },
        coy: '',
        rackNumber: '',
        lastAuditBy: '',
        repairHistory: [''],
        upcomingMaintenanceDate: '',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('fixedToOfficer')) {
            const officerField = name.split('.')[1];
            setWeaponData((prev) => ({
                ...prev,
                fixedToOfficer: {
                    ...prev.fixedToOfficer,
                    [officerField]: value
                }
            }));
        } else {
            setWeaponData({ ...weaponData, [name]: value });
        }
    };

    const handleRepairHistoryChange = (index, value) => {
        const newRepairHistory = [...weaponData.repairHistory];
        newRepairHistory[index] = value;
        setWeaponData({ ...weaponData, repairHistory: newRepairHistory });
    };

    const handleAddRepairHistory = () => {
        setWeaponData({ ...weaponData, repairHistory: [...weaponData.repairHistory, ''] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://armoury-backend-ti9n.onrender.com/api/weapons', weaponData)
            .then(response => {
                alert('Weapon added successfully!');
            })
            .catch(error => {
                console.error('Error adding weapon:', error);
                alert('Failed to add weapon');
            });
    };

    return (
        <section className="mt-5 container-fluid ">
            <h3 className="text-white mb-4 border-bottom border-light pb-3">Add New Weapon</h3>
         <div className="row">
            <div className="col-md-11 m-auto new-weapon p-3">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formType">
                            <Form.Label>Weapon Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter weapon type"
                                name="type"
                                value={weaponData.type}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formRegisterNumber">
                            <Form.Label>Register Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter register number"
                                name="registerNumber"
                                value={weaponData.registerNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formButtno">
                            <Form.Label>Butt Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter butt number"
                                name="buttno"
                                value={weaponData.buttno}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={weaponData.status}
                                onChange={handleInputChange}
                            >
                                <option value="In Service">In Service</option>
                                <option value="Under Maintenance">Under Maintenance</option>
                                <option value="Missing">Missing</option>
                                <option value="Expired">Expired</option>
                                <option value="issued">Issued</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group controlId="formRank">
                            <Form.Label>Officer Rank</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter officer rank"
                                name="fixedToOfficer.rank"
                                value={weaponData.fixedToOfficer.rank}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formMetalno">
                            <Form.Label>Officer Metal Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter officer metal number"
                                name="fixedToOfficer.metalno"
                                value={weaponData.fixedToOfficer.metalno}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formOfficerName">
                            <Form.Label>Officer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter officer name"
                                name="fixedToOfficer.officername"
                                value={weaponData.fixedToOfficer.officername}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formCoy">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter company name"
                                name="coy"
                                value={weaponData.coy}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formRackNumber">
                            <Form.Label>Rack Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter rack number"
                                name="rackNumber"
                                value={weaponData.rackNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formLastAuditBy">
                            <Form.Label>Last Audit By</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last audit by"
                                name="lastAuditBy"
                                value={weaponData.lastAuditBy}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUpcomingMaintenanceDate">
                            <Form.Label>Upcoming Maintenance Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="upcomingMaintenanceDate"
                                value={weaponData.upcomingMaintenanceDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formImage">
                            <Form.Label>Weapon Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                name="image"
                                value={weaponData.image}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <button  type="submit" className="mt-3 g-btn px-5">Submit</button>
            </Form>
            </div>
         </div>
        </section>
    );
}

export default NewWeapon;
