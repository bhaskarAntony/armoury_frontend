import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import TotalWeaponsCard from '../../components/TotalWeaponsCard';
import AvailableWeaponsCard from '../../components/AvailableWeaponsCard';
import IssuedWeaponsCard from '../../components/IssuedWeaponsCard';
import ManageOfficers from '../manageOfficers/ManageOfficers';
import ManageWeapons from '../manageWeapons/ManageWeapons';

function Home() {
    const [stats, setStats] = useState({
        totalWeapons: 0,
        availableWeapons: 0,
        issuedWeapons: 0,
        totalOfficers: 0,
        officersWithWeapons: 0,
        dailyStatus: { labels: [], data: [] },
        monthlyData: { labels: [], issued: [], remaining: [] },
      });
    useEffect(() => {
        // Fetch stats data from the backend
        axios.get('https://armoury-backend-ti9n.onrender.com/api/transactions/stats')
          .then(response => {
            setStats(response.data);
          })
          .catch(error => {
            console.error('Error fetching stats:', error);
          });
      }, []);

      const dailyStatusChart = {
        labels: stats.dailyStatus.labels,
        datasets: [
          {
            data: stats.dailyStatus.data,
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          },
        ],
      };
    
      // Line chart for monthly weapon data (issued and remaining)
      const monthlyDataChart = {
        labels: stats.monthlyData.labels,
        datasets: [
          {
            label: 'Weapons Issued',
            data: stats.monthlyData.issued,
            fill: false,
            borderColor: '#4BC0C0',
            tension: 0.1,
          },
          {
            label: 'Weapons Remaining',
            data: stats.monthlyData.remaining,
            fill: false,
            borderColor: '#FF9F40',
            tension: 0.1,
          },
        ],
      };
  return (
    <section className="container-fluid p-0">
        <header className='d-flex gap-2 align-items-center p-3'>
        <i class="bi bi-list fs-2 text-white fw-bold"></i>
        <div className="search w-100">
        <i class="bi bi-search text-secondary"></i>
        <input type="text" placeholder='Search'className='w-100' />
        </div>
        </header>
       <div className="p-3">
       <h3 className="fs-4 text-white mt-2 fw-normal">Dashboard</h3>
       <div className="row mt-3">
        <div className="col-md-4 mb-3">
            <div className="dashboard-card h-100">
               <TotalWeaponsCard total={stats.totalWeapons}/>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <div className="dashboard-card h-100">
              <AvailableWeaponsCard total={stats.availableWeapons}/>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <div className="dashboard-card h-100">
               <IssuedWeaponsCard total={stats.issuedWeapons}/>
            </div>
        </div>
        <div className="col-md-12 mb-3">
              <ManageWeapons/>
        </div>
        <div className="col-md-12 mb-3">
            <ManageOfficers/>
        </div>
        


   

       </div>
       </div>
    </section>
  )
}

export default Home