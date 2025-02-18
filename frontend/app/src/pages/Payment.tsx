import React, { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import PaymentFormComponent from '../components/PaymentFormComponent';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavbarComponent from '../components/bottomNavComponent';
// import VehicleTypeComponent from '../components/vehicleCardComponent';
// import NextButtonComponent from '../components/nextButton';
// import PrevButtonComponent from '../components/previousButton';
import { useNavigate } from 'react-router-dom';
import '../css/paymentform.css'
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
      <BottomNavbarComponent />
    </div>
  );
};

export default Payment;
