import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import InvoiceCard from './InvoiceCard';
import { 
  faApplePay,
  faGooglePay,
  faCcPaypal, 
  faCcMastercard, 
  faCcVisa, 
  faCcAmex 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

// Payment method and card type icons
const PaymentMethodIcons = {
  paypal: '/path/to/paypal-icon.svg', // Replace with actual path
  applePay: '/path/to/apple-pay-icon.svg', // Replace with actual path
  googlePay: '/path/to/google-pay-icon.svg', // Replace with actual path
  mastercard: '/path/to/mastercard-icon.svg', // Replace with actual path
  visa: '/path/to/visa-icon.svg', // Replace with actual path
  amex: '/path/to/amex-icon.svg', // Replace with actual path
};

// Added missing PaymentStatusModal type
interface PaymentStatusModalProps {
  status: 'success' | 'error';
  message: string;
  onClose: () => void;
}

interface PaymentFormProps {
  itemSize?: string;
  vehicleType?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  subtotal?: number;
  tax?: number;
}

// Placeholder for PaymentStatusModal component
const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ status, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2>{status === 'success' ? 'Payment Successful' : 'Payment Failed'}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const PaymentFormComponent: React.FC<PaymentFormProps> = ({
  itemSize = "Medium item",
  vehicleType = "Car",
  pickupAddress = "",
  dropoffAddress = "",
  subtotal = 99.00,
  tax = 9.90
}) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'applepay' | 'googlepay'>('card');
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate a random success/failure for testing
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      setPaymentStatus('success');
      setStatusMessage('Payment processed successfully');
      setShowModal(true);
      // navigate('/payment-success');
    } else {
      setPaymentStatus('error');
      setStatusMessage('Payment processing failed');
      setShowModal(true);
      // navigate('/payment-error');
    }
  };

  const total = subtotal + tax;
  const currentDate = new Date().toLocaleDateString();
  const invoiceNo = 'INV-2024-001';

  // Add country options
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  // Payment method selection buttons
  const PaymentMethodButton = ({ 
    method, 
    icon, 
    iconColor 
  }: { 
    method: 'paypal' | 'applepay' | 'googlepay', 
    icon: any, 
    iconColor?: string 
  }) => (
    <button 
      type="button"
      className={`p-3 rounded-lg border ${selectedPayment === method ? 'border-blue-500' : 'border-gray-200'}`}
      onClick={() => setSelectedPayment(method)}
    >
      {/* Fallback to FontAwesome if SVG paths not provided */}
      {PaymentMethodIcons[method] ? (
        <img 
          src={PaymentMethodIcons[method]} 
          alt={`${method} payment`} 
          className="h-6 w-6"
        />
      ) : (
        <FontAwesomeIcon 
          icon={icon} 
          className={`h-6 w-6 ${iconColor || ''}`} 
        />
      )}
    </button>
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Invoice Card */}
        <div className="mb-6">
          <InvoiceCard
            invoiceNo={invoiceNo}
            status="Pending Payment"
            date={currentDate}
            item={`${itemSize} - ${vehicleType}`}
            pickupAddress={pickupAddress}
            dropoffAddress={dropoffAddress}
          />
        </div>

        {/* Payment Methods */}
        <div className="flex justify-start gap-4 mb-6">
          <PaymentMethodButton 
            method="paypal" 
            icon={faCcPaypal}
            iconColor="text-[#003087]"
          />
          <PaymentMethodButton 
            method="applepay" 
            icon={faApplePay}
            iconColor="text-black"
          />
          <PaymentMethodButton 
            method="googlepay" 
            icon={faGooglePay}
            iconColor="text-[#5f6368]"
          />
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full-name</label>
            <input
              type="text"
              required
              className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select 
              required
              className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              required
              className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="0000 - 0000 - 0000 - 0000"
              required
              className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-8 flex gap-2">
              {/* Card type icons with fallback to FontAwesome */}
              {PaymentMethodIcons.mastercard ? (
                <img 
                  src={PaymentMethodIcons.mastercard} 
                  alt="Mastercard" 
                  className="h-5 w-5" 
                />
              ) : (
                <FontAwesomeIcon 
                  icon={faCcMastercard} 
                  className="h-5 w-5 text-[#EB001B]" 
                />
              )}
              
              {PaymentMethodIcons.visa ? (
                <img 
                  src={PaymentMethodIcons.visa} 
                  alt="Visa" 
                  className="h-5 w-5" 
                />
              ) : (
                <FontAwesomeIcon 
                  icon={faCcVisa} 
                  className="h-5 w-5 text-[#1434CB]" 
                />
              )}
              
              {PaymentMethodIcons.amex ? (
                <img 
                  src={PaymentMethodIcons.amex} 
                  alt="American Express" 
                  className="h-5 w-5" 
                />
              ) : (
                <FontAwesomeIcon 
                  icon={faCcAmex} 
                  className="h-5 w-5 text-[#006FCF]" 
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
              <input
                type="text"
                placeholder="MM/YYYY"
                required
                className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Security code</label>
              <input
                type="text"
                placeholder="CVV"
                required
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors mt-6"
          >
            PAY ${total.toFixed(2)}
          </button>
        </form>
      </div>

      {/* Payment Status Modal */}
      {showModal && paymentStatus && (
        <PaymentStatusModal
          status={paymentStatus}
          message={statusMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default PaymentFormComponent;
