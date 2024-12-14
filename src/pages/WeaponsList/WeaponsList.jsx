import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeaponsList = () => {
  const [weapons, setWeapons] = useState([]); // To store the weapons data

  // Fetch the weapon data from the backend API
  useEffect(() => {
    axios.get('https://armoury-backend-ti9n.onrender.com/api/transactions/list')
      .then(response => {
        // Filter transactions where returnDate is not available (not returned yet)
        const notReturnedTransactions = response.data.filter(item => !item.returnDate && item.officer);
        setWeapons(notReturnedTransactions); // Store the filtered transactions in state
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fs-3 text-white">Issued Weapons (Non-Fixed)</h3>
      <table className="">
        <thead>
          <tr>
            <th>Weapon Name</th>
            <th>Register Number</th>
            <th>Status</th>
            {/* <th>Officer Name</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {weapons.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No non-fixed weapons found</td>
            </tr>
          ) : (
            weapons.map((weapon) => (
              <tr key={weapon._id}>
                <td>{weapon.type}</td>
                <td>{weapon.registerNumber}</td>
                <td>{weapon.status}</td>
                {/* <td>{weapon.fixedToOfficer ? weapon.fixedToOfficer.officername : 'Not Assigned'}</td> */}
                <td className='d-flex gap-3 align-items-center h-100 mt-1'>
                        <a href={`/return/weapon/${weapon._id}`}><button className="btn-sm g-btn fs-6 p-1 px-2"><i class="bi bi-send"></i></button></a>
                  
                    </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponsList;
