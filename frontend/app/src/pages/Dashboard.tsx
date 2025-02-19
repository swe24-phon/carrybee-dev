import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import DashboardComponent from '../components/DashboardComponent';
import InvoiceCard from '../components/InvoiceCard';
import '../css/Dashboard.css';
import '../css/TopNav.css';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center pt-4 space-y-4">
        <DashboardComponent invoices={[]} />
        <InvoiceCard />
      </div>
    </div>
  );
};

export default Dashboard;
