import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function ManageOfficers() {
    const [weapons, setWeapons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch weapons from backend
        axios.get('https://armoury-backend-ti9n.onrender.com/api/officers')
            .then(response => setWeapons(response.data))
            .catch(error => console.error('Error fetching weapons:', error));
    }, []);

    const handleCardClick = (weaponId) => {
        navigate(`/weapon/${weaponId}`);
    };

    return (
        <div className="container-fluid h-100 mt-4 officers">
         <div className="d-flex align-items-center justify-content-between  border-bottom border-light pb-3 mb-5">
         <h3 className="text-white fs-3">Manage Officers</h3>
         <a href='/new/officers' className="g-btn rounded-2"><i class="bi bi-plus-lg"></i> Create New Officer</a>
         </div>
           <table border='0'>
            <tr>
                <th>Profile</th>
                <th>Officer's Name</th>
                <th>Rank</th>
                <th>Metal No</th>
                <th>Status</th>
                <th>Duty</th>
                <th>Actions</th>
            </tr>
           {weapons.map(officer => (
                <tr>
                    <td><img src="https://cdn-icons-png.freepik.com/256/16111/16111341.png?ga=GA1.1.1471963966.1728382128&semt=ais_hybrid" alt="" className='profile'/></td>
                    <td>{officer.name}</td>
                    <td>{officer.rank}</td>
                    <td>{officer.metalNo}</td>
                    <td><span className={`p-1 rounded-1 px-3 fs-6 ${officer.status == 'returned'?'success':'danger'}`}>{officer.status}</span></td>
                    <td className='text-warning fs-6'>{officer.duty}</td>
                    <td className='d-flex gap-3 align-items-center h-100 mt-3'>
                        <a href={`/issue/weapons/${officer._id}`}><button className="btn-sm g-btn fs-6 p-1 px-2"><i class="bi bi-send"></i></button></a>
                   <a href={`/edit/officer/${officer._id}`}> <button className="btn-sm g-btn fs-6 p-1 px-2"><i class="bi bi-pencil"></i></button></a>
                    </td>
                </tr>
                ))}
           </table>
        </div>
    );
}

export default ManageOfficers;
