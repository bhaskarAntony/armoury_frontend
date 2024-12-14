// components/OfficersWithWeaponsCard.jsx
import React from 'react';
import DashboardCard from './DashboardCard';

const OfficersWithWeaponsCard = () => {
  const officersWithWeapons = 20; // Replace with dynamic data fetching

  return <DashboardCard title="Officers with Weapons" content={`Officers: ${officersWithWeapons}`} />;
};

export default OfficersWithWeaponsCard;
