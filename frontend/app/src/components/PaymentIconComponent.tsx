import React from 'react';
import AppleIcon from '../assets/applepay_icon.png';
import GoogleIcon from '../assets/googlepay_icon.png'
import PaypalIcon from '../assets/paypal_icon.png'

const PaymentIconComponent = () => {
  return (
    <>
      <div className='payment-icon-container'>
        <img src={AppleIcon} alt="apple_icon" />
        <img src={GoogleIcon} alt="google_icon" />
        <img src={PaypalIcon} alt="paypal_icon" />
      </div>
    </>
  );
};

export default PaymentIconComponent;
