import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; // Add this import
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/bottomNavComponent';

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavbarComponent /> {/* Note: Corrected from NavBarComponent */}
        
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4 text-center">
            <FontAwesomeIcon 
              icon={faCircleCheck} 
              className="text-6xl text-green-500 mb-6"
            />
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Your payment has been processed successfully. Thank you for your business!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
  
        <BottomNavComponent />
      </div>
    );
  };
  
  export default PaymentSuccess;
