import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReturnWeapon() {
    const { transactionId } = useParams(); // Transaction ID from URL
    const [transaction, setTransaction] = useState(null); // Transaction details
    const [selectedWeapons, setSelectedWeapons] = useState([]); // Weapons to return

    // Fetch transaction details on mount
    useEffect(() => {
        axios.get(`https://armoury-backend-ti9n.onrender.com/api/single/transactions/${String(transactionId)}`)
            .then(response => setTransaction(response.data))
            .catch(error => console.error('Error fetching transaction:', error));
    }, [transactionId]);

    // Handle checkbox selection
    const handleCheckboxChange = (weaponId) => {
        setSelectedWeapons(prev =>
            prev.includes(weaponId)
                ? prev.filter(id => id !== weaponId) // Remove if already selected
                : [...prev, weaponId] // Add if not selected
        );
    };

    // Handle form submission to return selected weapons
    const handleReturnWeapons = () => {
        if (selectedWeapons.length === 0) {
            alert('Please select at least one weapon to return.');
            return;
        }

        axios.post('https://armoury-backend-ti9n.onrender.com/api/transactions/return', {
            transactionId,
            weaponsIds: selectedWeapons,
        })
            .then(response => {
                alert('Weapons returned successfully!');
                setSelectedWeapons([]); // Reset selected weapons
            })
            .catch(error => {
                console.error('Error returning weapons:', error);
                alert('Failed to return weapons.');
            });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Return Weapons</h3>
            {transaction ? (
                <>
                    <p><strong>Officer Name:</strong> {transaction.transactiondata.officer}</p>
                    <p><strong>Issue Date:</strong> {new Date(transaction.transactiondata.issueDate).toLocaleDateString()}</p>
                    <p><strong>Weapons Issued:</strong></p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Weapon Type</th>
                                <th>Register Number</th>
                                <th>Status</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.weaponDetails.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.type}</td>
                                    <td>{item.registerNumber}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(item._id)}
                                            checked={selectedWeapons.includes(item._id)} // Pre-check if already selected
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={handleReturnWeapons}
                    >
                        Return Selected Weapons
                    </button>
                </>
            ) : (
                <p>Loading transaction details...</p>
            )}
        </div>
    );
}

export default ReturnWeapon;
