import React from 'react';
import PaymentFormComponent from '../components/PaymentFormComponent';
import NavbarComponent from '../components/NavbarComponent';
import BottomNav from '../components/BottomNavComponent';
import { useNavigate } from 'react-router-dom';
import '../css/topnav.css';
import '../css/bottomnav.css';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <NavbarComponent />

      {/* Main Content */}
      <div className="main-content">
        <PaymentFormComponent />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Payment;
