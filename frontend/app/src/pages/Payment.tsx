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
        <Elements stripe={stripePromise}>
          <PaymentComponent 
            itemWeight={10}
            vehicleType="CAR"
            pickupAddress="123 Pickup St"
            dropoffAddress="456 Dropoff Ave"
            itemDescription="Standard Delivery"
          />
        </Elements>
        <BottomNavComponent />
      </div>
    </div>
  );
};

export default Payment;
