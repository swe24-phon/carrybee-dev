import React, { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import PaymentFormComponent from '../components/PaymentFormComponent';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/BottomNavComponent';
import VehicleTypeComponent from '../components/VehicleCardComponent';
import NextButtonComponent from '../components/NextButton';
import PrevButtonComponent from '../components/PreviousButton';
import { useNavigate } from 'react-router-dom';
import '../css/topnav.css';
import '../css/BottomNav.css';

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
      <BottomNavbarComponent />
    </div>
  );
};

export default Payment;
