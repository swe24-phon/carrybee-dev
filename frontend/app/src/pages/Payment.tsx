import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentFormComponent from '../components/PaymentFormComponent';
import NavBarComponent from '../components/NavBarComponent';
import BottomNavComponent from '../components/BottomNavComponent';

// Import payment method icons
import paypal from '../assets/paypal.png';
import applepay from '../assets/applepay.png';
import googlepay from '../assets/googlepay.png';
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';
import maestro from '../assets/maestro.png';
import amex from '../assets/amex.png';

// Initialize Stripe outside the component
const stripePromise = loadStripe('your_publishable_key');

const Payment: React.FC = () => {
  const paymentIcons = {
    paypal,
    applepay,
    googlepay,
    mastercard,
    visa,
    maestro,
    amex
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <NavBarComponent />
      
      {/* Main Content */}
      <div className="flex-1 py-12 mt-4">
        <div className="max-w-md mx-auto">
          <Elements stripe={stripePromise}>
            <PaymentFormComponent 
              itemSize="Medium item"
              vehicleType="Car"
              pickupAddress="123 Pickup St"
              dropoffAddress="456 Dropoff Ave"
              subtotal={99.00}
              tax={9.90}
              paymentIcons={paymentIcons}
            />
          </Elements>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavComponent />
    </div>
  );
};

export default Payment;
