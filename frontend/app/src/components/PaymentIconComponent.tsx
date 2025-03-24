import React, { useState } from 'react';
import AppleIcon from '../assets/applepay_icon.png';
import GoogleIcon from '../assets/googlepay_icon.png';
import PaypalIcon from '../assets/paypal_icon.png';

const PaymentIconComponent = () => {
  // State to track the selected payment method
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Handle payment click and update the selected state
  const handlePaymentClick = (paymentMethod) => {
    console.log(`${paymentMethod} clicked`);
    setSelectedPayment(paymentMethod); // Set the selected payment method
  };

  return (
    <>
      <div className="payment-icon-container flex justify-around items-center">
        {/* Apple Pay Icon */}
        <button
          onClick={() => handlePaymentClick('apple')}
          className={`p-2 rounded ${selectedPayment === 'apple' ? 'border-3 border-black' : ''}`} // Highlight when selected
        >
          <img src={AppleIcon} alt="apple_icon" className="w-12 h-12" />
        </button>

        {/* Google Pay Icon */}
        <button
          onClick={() => handlePaymentClick('google')}
          className={`p-2 rounded ${selectedPayment === 'google' ? 'border-3 border-black' : ''}`} // Highlight when selected
        >
          <img src={GoogleIcon} alt="google_icon" className="w-12 h-12" />
        </button>

        {/* PayPal Icon */}
        <button
          onClick={() => handlePaymentClick('paypal')}
          className={`p-2 rounded ${selectedPayment === 'paypal' ? 'border-3 border-black' : ''}`} // Highlight when selected
        >
          <img src={PaypalIcon} alt="paypal_icon" className="w-12 h-12" />
        </button>
      </div>
    </>
  );
};

export default PaymentIconComponent;
