import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceCard from './InvoiceCard';
import '../css/Dashboard.css';
import '../css/Invoice.css';

interface Invoice {
  invoiceNo: string;
  status: string;
  date: string;
  item: string;
  pickupAddress: string;
  dropoffAddress: string;
}

interface DashboardComponentProps {
  invoices: Invoice[];
}

const DashboardComponent = ({ invoices }: DashboardComponentProps) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-panel">
        {/* Header */}
        <div className="profile-section">
          <div className="profile-avatar">
            <img
              className="profile-image"
              src="https://placehold.co/21x31"
              alt="Profile"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div id="dashboard-welcome">
          Welcome to dashboard
        </div>

        {/* Invoice Cards Section */}
        <div className="cards-section">
          {invoices.map((invoice, index) => (
            <InvoiceCard
              key={index}
              {...invoice}
            />
          ))}
        </div>

        {/* Button Container */}
        <div className="button-container">
          <button
            onClick={handleHomeClick}
            className="home-button hover:bg-[#FECF30] transition-colors duration-300"
          >
            <span className="home-button-text">
              home
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
