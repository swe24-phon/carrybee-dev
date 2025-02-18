import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentFormComponent = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Payment submitted');
    };
  
    return (
      <div className="payment-form-container">
        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Details Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456"
              className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
          {/* Order Summary */}
          <div className="mt-6 pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>$9.90</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>$108.90</span>
              </div>
            </div>
          </div>
  
          {/* Pay Button */}
          <button 
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
    );
  };
  
  export default PaymentFormComponent;
