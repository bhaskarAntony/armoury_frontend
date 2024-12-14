// components/DashboardCard.jsx
import React from 'react';
import './DashboardCard.css'; // Optional for specific styling

const DashboardCard = ({ title, content }) => {
  return (
    <div className="dashboard-card h-100">
      <h5 className="mb-2">{title}</h5>
      <p>{content}</p>
    </div>
  );
};

export default DashboardCard;
