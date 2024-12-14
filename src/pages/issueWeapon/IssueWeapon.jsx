import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css'

function IssueWeapon() {
    const { officerId } = useParams();  // Get officerId from the URL params
    const [weapons, setWeapons] = useState([]);  // List of weapons
    const [selectedWeapons, setSelectedWeapons] = useState([]);  // List of selected weapon IDs
    const [searchQuery, setSearchQuery] = useState("");  // Search query for filtering weapons

    // Fetch the weapons from the backend
    useEffect(() => {
        axios.get('https://armoury-backend-ti9n.onrender.com/api/weapons')
            .then(response => {
                setWeapons(response.data);  // Set weapons data to state
            })
            .catch(error => console.error('Error fetching weapons:', error));
    }, []);

    // Handle search query changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter weapons based on search query
    const filteredWeapons = weapons.filter(weapon =>
        weapon.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        weapon.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        weapon.buttno.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle checkbox selection of weapons
    const handleCheckboxChange = (weaponId) => {
        setSelectedWeapons(prevState =>
            prevState.includes(weaponId)
                ? prevState.filter(id => id !== weaponId)  // Remove weapon if already selected
                : [...prevState, weaponId]  // Add weapon if not selected
        );
    };

    // Handle form submission to issue selected weapons to the officer
    const handleIssueWeapons = () => {
        if (selectedWeapons.length === 0) {
            alert('Please select at least one weapon to issue.');
            return;
        }

        // Send the request to issue the weapons
        axios.post('https://armoury-backend-ti9n.onrender.com/api/transactions/issue', {
            officerId,
            weaponIds: selectedWeapons
        })
            .then(response => {
                alert('Weapons issued successfully!');
            })
            .catch(error => {
                console.error('Error issuing weapons:', error);
                alert('Failed to issue weapons.');
            });
    };
 

    return (
        <div className="container-fluid mt-4 p-3">
             <h3 className="text-white mb-4 border-bottom border-light pb-3">Issue Weapons to Officer</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by weapon name, register no, or buttno"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <table>
    <thead>
        <tr>
            <th>Weapon Name</th>
            <th>Weapon Register No</th>
            <th>Status</th>
            <th>Select</th>
        </tr>
    </thead>
    <tbody>
        {filteredWeapons.map((weapon) => {
            // Determine if the weapon is unavailable
            const isUnavailable =
                weapon.status === "issued" ||
                (weapon.fixedToOfficer &&
                    (weapon.fixedToOfficer.rank !== "" ||
                        weapon.fixedToOfficer.officername !== "" ||
                        weapon.fixedToOfficer.metalno !== ""));

            return (
                <tr
                    key={weapon._id}
                   
                >
                    {/* Weapon details */}
                    <td>{weapon.type}</td>
                    <td>{weapon.registerNumber}</td>

                    {/* Display status */}
                    <td>{isUnavailable ? <span className="danger p-1 px-2 rounded fs-6">Unavailable</span> : <span className="success p-1 px-2 rounded fs-6">Available</span> }</td>

                    {/* Checkbox for selection */}
                    <td>
                        {!isUnavailable && (
                            <input
                                type="checkbox"
                                id={weapon._id}
                                onChange={() => handleCheckboxChange(weapon._id)}
                            />
                        )}
                    </td>
                </tr>
            );
        })}
    </tbody>
</table>


            <button
                className="g-btn mt-3"
                onClick={handleIssueWeapons}
            >
                Issue Selected Weapons
            </button>
        </div>
    );
}

export default IssueWeapon;
