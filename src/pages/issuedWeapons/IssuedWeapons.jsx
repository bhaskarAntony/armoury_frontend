import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function IssuedWeapons() {
    const [weapons, setWeapons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch weapons from backend
        axios.get('https://armoury-backend-ti9n.onrender.com/api/weapons')
        .then(response => setWeapons(response.data.filter(item => 
            item.status === 'issued' && 
            item.fixedToOfficer &&
            item.fixedToOfficer.rank !== '' && 
            item.fixedToOfficer.officername !== '' && 
            item.fixedToOfficer.metalno !== ''
        )))
        .catch(error => console.error('Error fetching weapons:', error));
        
    }, []);

    const handleCardClick = (weaponId) => {
        navigate(`/weapon/${weaponId}`);
    };

    return (
        <div className="container mt-4">
         <div className="d-flex align-items-center justify-content-between  border-bottom border-light pb-3 mb-5">
         <h3 className="text-white fs-1">Manage Weapons</h3>
        
         </div>
            <div className="row">
               {
                weapons.length>0?(
                    weapons.map(weapon => (
                        <div 
                            key={weapon._id} 
                            className="col-md-4 mb-4"
                            onClick={() => handleCardClick(weapon._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="dashboard-card p-3 text-white weapon-card weapon-card-issed">
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
                    ))
                ):(
                    <div className="col-md-6 m-auto dashboard-card p-4 text-center text-white">
                        <img src="https://cdn-icons-png.freepik.com/256/12344/12344675.png?ga=GA1.1.1471963966.1728382128&semt=ais_hybrid" alt="" className='w-50' />
                        <br />
                        <h1 className="fs-4">No Data Found</h1>

                    </div>
                )
               }
            </div>
        </div>
    );
}

export default IssuedWeapons;
