import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import NavbarComponent from '/src/components/NavbarComponent';
import BottomNavComponent from '/src/components/BottomNavComponent';

const PaymentError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavbarComponent />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4 text-center">
          <FontAwesomeIcon 
            icon={faCircleXmark} 
            className="text-6xl text-red-500 mb-6"
          />
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">
            There was an error processing your payment. Please try again or contact support.
          </p>
          <button
            onClick={() => navigate('/payment')}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 mb-3"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
          >
            Contact Support
          </button>
        </div>
      </div>

      <BottomNavComponent />
    </div>
  );
};

export default PaymentError;
