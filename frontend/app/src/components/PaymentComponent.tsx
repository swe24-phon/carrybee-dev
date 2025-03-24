import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import PayButtonComponent from '../components/PayButtonComponent';
import ForgotButtonComponent from '../components/ForgotButtonComponent';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from './BottomNavComponent';
import '../css/paymentform.css';
import useOrderStore from '../store/orderStore';
import useParcelStore from '../store/parcelStore';
import usePaymentStore from '../store/paymentStore';

// const stripePublicKey = import.meta.env.VITE_STRIPE_KEY;
const stripePublicKey = import.meta.env.REACT_APP_STRIPE_KEY;

if (!stripePublicKey) {
  console.error("❌ Stripe API key is missing! Check your .env file.");
}

const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;


// Define the interfaces for our data
interface DeliveryDetails {
  itemName: string;
  size: string;
  quantity: number;
  status: string;
  orderId: string;
  description: string;
  vehicle: string;
}

const PaymentComponent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get store state using hooks at component level for proper subscription
  const orderDetails = useOrderStore((state) => state.orderDetails);
  const parcelDetails = useParcelStore((state) => state.parcelDetails);
  const submitPayment = usePaymentStore((state) => state.submitPayment);
  const setPaymentDetails = usePaymentStore((state) => state.setPaymentDetails);

  // Icon component for the "Change" button
  const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const deliveryDetails: DeliveryDetails = {
    itemName: parcelDetails.item_name || "No item name",
    size: parcelDetails.category || "Not specified", // Assuming category represents size
    quantity: parcelDetails.quantity || 1,
    status: "Pending",
    orderId: orderDetails.parcel_id || "OD - 1342",
    description: parcelDetails.description || "No description",
    vehicle: orderDetails?.selectedVehicle?.name  || "Not Selected"
  };

  const pickupAddress = orderDetails.pickup_address || "No address available";
  const dropoffAddress = orderDetails.dropoff_address || "No address available";
  const subtotal = orderDetails.total || 0;
  const extraservice = 10;
  const total = subtotal + extraservice;

  const handleForgot = (event: React.MouseEvent) => {
    event.preventDefault();
    // Navigate to the form page
    navigate('/form');
  };

  const createCheckoutSession = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) {
        console.error("Stripe failed to initialize.");
        setLoading(false);
        return;
      }

      // Use values from component state rather than calling getState() again
      // Adjust total based on item size
      const sizeMultiplier: Record<string, number> = {
        small: 0.8,
        medium: 1,
        large: 1.2
      };

      const adjustedTotal = Math.round(total * (sizeMultiplier[deliveryDetails.size] || 1));

      const response = await fetch('http://localhost:4000/api/payments/createPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            amount: adjustedTotal,
            currency: 'aud',
          }],
          metadata: {
            invoiceNo: `INV-${deliveryDetails.orderId}`,
            name: `Order ${deliveryDetails.orderId}`,
            description: deliveryDetails.description,
            quantity: parcelDetails.quantity,
            // Vlad change quantity
            orderId: deliveryDetails.orderId,
            itemSize: deliveryDetails.size,
            status: deliveryDetails.status
          },
          // success_url: window.location.origin + '/PaymentSuccess',
          // cancel_url: window.location.origin + '/PaymentError'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      // const { error } = await stripe.redirectToCheckout({ sessionId });
      //Vlad and Phon change
      console.log(sessionId)
      if (error) throw error;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  const handlePayment = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Use the setPaymentDetails function from the hook
      setPaymentDetails();

      // Submit the payment using the function from the hook
      await submitPayment();

      setLoading(false);
    } catch (error) {
      console.error('❌ Payment failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Fixed Top Navigation */}
      <div className="fixed-top">
        <NavbarComponent />
      </div>

      {/* Main Scrollable Content */}
      <div className="scrollable-content">
        <div className="order-summary-container">
          {/* Header without back button */}
          <div className="header">
            <h1 className="title">Order Summary</h1>
          </div>

          {/* Delivery Summary Section */}
          <div className="delivery-summary">
            <h2 className="section-title">Delivery Summary</h2>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Name of Item</div>
                <div className="summary-value">{deliveryDetails.itemName}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Size of Delivery</div>
                <div className="summary-value">{deliveryDetails.size}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Quantity</div>
                <div className="summary-value">{deliveryDetails.quantity}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Status</div>
                <div className="summary-value">{deliveryDetails.status}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Order ID</div>
                <div className="summary-value">{deliveryDetails.orderId}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Description</div>
                <div className="summary-value">{deliveryDetails.description}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Vehicle Selected</div>
                <div className="summary-value">{deliveryDetails.vehicle}</div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="shipping-info">
            <div className="section-header">
              <h2 className="section-title">Shipping Information</h2>
              <button
                className="change-button"
                onClick={() => navigate('/homepage')}
              >
                Change <ChevronRightIcon />
              </button>
            </div>

            <div className="address-container">
              <div className="address-item">
                <div className="pin-icon pickup-pin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FECF30" stroke="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="address-details">
                  <div className="address-label">Pick-up</div>
                  <p className="shipping-address">{pickupAddress}</p>
                </div>
              </div>

              <div className="address-item">
                <div className="pin-icon dropoff-pin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000000" stroke="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="address-details">
                  <div className="address-label">Drop-off</div>
                  <p className="shipping-address">{dropoffAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-method">
            <h2 className="section-title">Payment Summary</h2>
          </div>

          {/* Cost Breakdown */}
          <div className="cost-breakdown">
            <div className="cost-row">
              <span className="cost-label">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cost-row">
              <span className="cost-label">Additional Fee</span>
              <span>${extraservice.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Button Container */}
          <div className="button-container">
            <div className="pay-button-wrapper">
              <PayButtonComponent
                onClick={() => {createCheckoutSession();
                navigate('/payment-form');
                }}
                loading={loading}
              />
            </div>
            <div className="forgot-button-wrapper">
            <ForgotButtonComponent
              onClick={() => handleForgot}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed-bottom">
        <BottomNavComponent />
      </div>
    </div>
  );
};

export default PaymentComponent;
