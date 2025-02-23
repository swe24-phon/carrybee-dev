import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import InvoiceCard from './InvoiceCard';
import { calculateDistance } from '../js/calculateDistance';
import { calculatePrice } from '../js/calculatePrice';
import '../css/paymentform.css'

interface PaymentFormProps {
  itemWeight: number;
  vehicleType: string;
  pickupAddress: string;
  dropoffAddress: string;
  itemDescription: string;
}

const PaymentFormComponent: React.FC<PaymentFormProps> = ({
  itemWeight,
  vehicleType,
  pickupAddress,
  dropoffAddress,
  itemDescription
}) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  // Schema-related states
  const [invoiceNo] = useState(`INV-${Date.now()}`);
  const [orderId] = useState(`ORD-${Date.now()}`);
  const [status] = useState('Pending');

  // Form states
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  
  // Payment states
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate price based on props
  useEffect(() => {
    try {
      const distance = calculateDistance(0, 0, 1, 1); 
      const price = calculatePrice(vehicleType, distance, itemWeight);
      setTotal(Math.round(price * 100)); 
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  }, [vehicleType, itemWeight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
  
    setIsProcessing(true);
  
    try {
      const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement)!,
        billing_details: {
          name: fullName,
          address: {
            line1: address,
            country: country,
          },
        },
      });
  
      if (error) {
        setPaymentStatus('error');
        setStatusMessage(error.message || 'Payment failed');
        setShowModal(true);
        return;
      }
  
      const paymentData = {
        invoice_no: invoiceNo,
        total: total,
        payment_method: pm.id,
        status: status,
        order_id: orderId,
        item_description: itemDescription,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        vehicle_type: vehicleType
      };
  
      const response = await fetch('http://localhost:4000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
  
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Payment failed');
      }

      setPaymentStatus('success');
      setStatusMessage('Payment processed successfully');
      setShowModal(true);
      setTimeout(() => navigate('/payment-success'), 2000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setStatusMessage('An error occurred while processing payment');
      setShowModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Japan', 'China', 'India', 'Brazil'
  ];

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1a1f36',
        backgroundColor: '#FFFDF1',
        '::placeholder': {
          color: '#94a3b8',
        },
        ':-webkit-autofill': {
          color: '#1a1f36',
        },
      },
      invalid: {
        color: '#ef4444',
        ':focus': {
          color: '#1a1f36',
        },
      },
    },
  };

  return (
    <div className="payment-page">
      <div className="payment-content">
        <div className="payment-container">
          <InvoiceCard
            invoiceNo={invoiceNo}
            status={status}
            date={new Date().toLocaleDateString()}
            item={`${itemDescription} - ${vehicleType}`}
            pickupAddress={pickupAddress}
            dropoffAddress={dropoffAddress}
          />

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Billing Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Card Details</label>
              <div className="card-element-container">
                <CardNumberElement 
                  options={{
                    ...cardElementOptions,
                    placeholder: 'Card Number'
                  }} 
                />
                <div className="flex mt-2 space-x-2">
                  <CardExpiryElement 
                    options={{
                      ...cardElementOptions,
                      placeholder: 'MM/YY'
                    }} 
                    className="flex-1" 
                  />
                  <CardCvcElement 
                    options={{
                      ...cardElementOptions,
                      placeholder: 'CVV'
                    }} 
                    className="flex-1" 
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="submit-button"
            >
              {isProcessing ? 'Processing...' : `PAY $${(total / 100).toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>

      {showModal && paymentStatus && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{paymentStatus === 'success' ? 'Payment Successful' : 'Payment Failed'}</h2>
            <p>{statusMessage}</p>
            <button 
              onClick={() => setShowModal(false)}
              className="submit-button mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentFormComponent;
