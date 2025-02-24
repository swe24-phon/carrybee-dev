import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import PayButtonComponent from './PayButtonComponent';
import ForgotButtonComponent from './ForgotButtonComponent';
import '../css/paymentform.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const PaymentComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNo: '',
    itemSize: 'medium',
    total: 1500,
    orderId: '',
    itemDescription: '',
    status: 'Pending'
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    itemName: "Package XYZ",
    size: "Medium",
    quantity: "2",
    status: "Ready for Delivery",
    orderId: "ORD-123456",
    description: "Fragile items - handle with care",
    vehicle: "Van - Toyota HiAce"
  });

  const handleForgot = (event: React.MouseEvent) => {
    event.preventDefault();
    // Navigate to the form page
    navigate('/form');
  };

  const createCheckoutSession = async () => {
    try {
      const sizeMultiplier = {
        small: 0.8,
        medium: 1,
        large: 1.2
      };
      
      const adjustedTotal = Math.round(formData.total * sizeMultiplier[formData.itemSize]);

      const response = await fetch('/api/createPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            name: `Order ${formData.orderId}`,
            description: formData.itemDescription,
            amount: adjustedTotal,
            quantity: 1
          }],
          metadata: {
            invoiceNo: formData.invoiceNo,
            orderId: formData.orderId,
            itemSize: formData.itemSize,
            status: formData.status
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  const handlePayment = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const paymentData = {
        invoice_no: formData.invoiceNo,
        itemSize: formData.itemSize,
        total: formData.total,
        status: formData.status,
        order_id: formData.orderId,
        item_description: formData.itemDescription,
      };

      const response = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment data');
      }

      await createCheckoutSession();
    } catch (error) {
      console.error('Error processing payment:', error);
      setLoading(false);
    }
  };

  return (
    <div className="pageContainer">
      <div className="scrollable-content">
        <h1 className="pageTitle">Delivery Summary</h1>
        
        <div className="summaryContainer">
          <div className="summaryGrid">
            <div className="summaryItem">
              <div className="summaryLabel">Name of Item</div>
              <div className="summaryValue">{deliveryDetails.itemName}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Size of Delivery</div>
              <div className="summaryValue">{deliveryDetails.size}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Quantity</div>
              <div className="summaryValue">{deliveryDetails.quantity}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Status</div>
              <div className="summaryValue">{deliveryDetails.status}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Order ID</div>
              <div className="summaryValue">{deliveryDetails.orderId}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Description</div>
              <div className="summaryValue">{deliveryDetails.description}</div>
            </div>
            <div className="summaryItem">
              <div className="summaryLabel">Vehicle Selected</div>
              <div className="summaryValue">{deliveryDetails.vehicle}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="buttonContainer">
        <div className="payButtonWrapper">
          <PayButtonComponent 
            onClick={handlePayment} 
            loading={loading}
          />
        </div>
        <div className="forgotButtonWrapper">
          <ForgotButtonComponent 
            onClick={handleForgot}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
