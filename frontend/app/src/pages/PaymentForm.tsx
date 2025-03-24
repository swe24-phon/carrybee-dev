import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/BottomNavComponent';
import PaymentCardComponent from '../components/PaymentCardComponent';
import PaymentIconComponent from '../components/PaymentIconComponent';
import PaymentFormComponent from '../components/PaymentFormComponent';
import '../css/phoneWrapper.css';
import '../css/paymentStripe.css'


const Payment: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <PaymentCardComponent />
      <PaymentIconComponent />
      <PaymentFormComponent />
      <BottomNavComponent />
    </>
  );
};

export default Payment;
