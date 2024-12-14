// components/TotalOfficersCard.jsx
import React from 'react';
import DashboardCard from './DashboardCard';

const TotalOfficersCard = () => {
  const totalOfficers = 50; // Replace with dynamic data fetching

  return <DashboardCard title="Total Officers" content={`Officers: ${totalOfficers}`} />;
};

export default TotalOfficersCard;
