import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function ManageWeapons() {
    const [weapons, setWeapons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch weapons from backend
        axios.get('https://armoury-backend-ti9n.onrender.com/api/weapons')
            .then(response => {
                // Filter weapons where fixedToOfficer is not null or empty
                const fixedWeapons = response.data.filter(item => item.fixedToOfficer && item.fixedToOfficer.officername !== '');
                setWeapons(fixedWeapons);
            })
            .catch(error => console.error('Error fetching weapons:', error));
    }, []);


    const handleCardClick = (weaponId) => {
        navigate(`/weapon/${weaponId}`);
    };

    return (
        <div className="container mt-4">
         <div className="d-flex align-items-center justify-content-between  border-bottom border-light pb-3 mb-5">
         <h3 className="text-white fs-3">Manage Weapons</h3>
         <a href='/new/weapon' className="g-btn rounded-2"><i class="bi bi-plus-lg"></i> Create New</a>
         </div>
            <div className="row">
                {weapons.map(weapon => (
                    <div 
                        key={weapon._id} 
                        className="col-md-4 mb-4"
                        onClick={() => handleCardClick(weapon._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="dashboard-card p-3 text-white weapon-card">
                            <img 
                                src={weapon.image || '/placeholder.jpg'} 
                                alt="Weapon" 
                                className="weapon-card-img mb-3"
                            />
                            <div className="weapon-card-body">
                                <h5>{weapon.type}</h5>
                                <p>Register Number: {weapon.registerNumber}</p>
                                <p>Status: <span className={`${weapon.status != 'issued'? 'text-success':'text-danger'}`}>{weapon.status}</span></p>
                                <button className="g-btn w-100">View Weapon</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageWeapons;
