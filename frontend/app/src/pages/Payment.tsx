import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentComponent from '../components/PaymentComponent';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/bottomNavComponent';
import '../css/phoneWrapper.css';

const stripePromise = loadStripe('');

const Payment: React.FC = () => {
  return (
    // Only use the basic phone frame structure
    <div className="smartphone-frame">
      <div className="app-content">
        <NavbarComponent />
          <PaymentComponent />
        <BottomNavComponent />
      </div>
    </div>
  );
};

export default Payment;
