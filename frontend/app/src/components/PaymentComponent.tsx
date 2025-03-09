// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import PayButtonComponent from '../components/PayButtonComponent';
// import ForgotButtonComponent from '../components/ForgotButtonComponent';
// import NavbarComponent from '../components/NavbarComponent';
// import BottomNavComponent from './BottomNavComponent';
// import '../css/paymentform.css';
// // import { apiURL } from "../api/createPayment"
// import useOrderStore from '../stores/orderStore';
// import useParcelStore from '../stores/parcelStore';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// // Define the interfaces for our data
// interface DeliveryDetails {
//   itemName: string;
//   size: string;
//   quantity: string;
//   status: string;
//   orderId: string;
//   description: string;
//   vehicle: string;
// }

// const PaymentComponent: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     invoiceNo: '',
//     itemSize: 'medium',
//     total: 1500,
//     orderId: 'ORD-12345',
//     itemDescription: 'Premium Delivery Package',
//     status: 'Pending'
//   });

//   // Icon component for the "Change" button
//   const ChevronRightIcon: React.FC = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="9 18 15 12 9 6"></polyline>
//     </svg>
//   );


//   const deliveryDetails: DeliveryDetails = {
//     itemName: "Fashion Bundle",
//     size: formData.itemSize,
//     quantity: "2",
//     status: formData.status,
//     orderId: formData.orderId,
//     description: formData.itemDescription,
//     vehicle: "Standard Delivery"
//   };

//   const shippingAddress = "1234 Foster Rd, Ann Creek, New Mexico 29481";
//   const subtotal = 410;
//   const delivery = 0;
//   const total = subtotal + delivery;

//   const handleForgot = (event: React.MouseEvent) => {
//     event.preventDefault();
//     // Navigate to the form page
//     navigate('/form');
//   };

//   const createCheckoutSession = async () => {
//     try {
//       // Adjust total based on item size
//       const sizeMultiplier: Record<string, number> = {
//         small: 0.8,
//         medium: 1,
//         large: 1.2
//       };

//       const adjustedTotal = Math.round(formData.total * (sizeMultiplier[formData.itemSize] || 1));
//       // Create checkout session via your frontend API
//       const response = await fetch('/api/createPayment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: [{
//             name: `Order ${formData.orderId}`,
//             description: formData.itemDescription,
//             amount: adjustedTotal,
//             quantity: 1
//           }],
//           metadata: {
//             invoiceNo: formData.invoiceNo,
//             orderId: formData.orderId,
//             itemSize: formData.itemSize,
//             status: formData.status
//           },
//           success_url: window.location.origin + '/PaymentSuccess',
//           cancel_url: window.location.origin + '/PaymentError'
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       // Get session ID from backend
//       const { sessionId } = await response.json();
//       // Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       if (stripe) {
//         const { error } = await stripe.redirectToCheckout({ sessionId });

//         if (error) {
//           throw error;
//         }
//       }
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       setLoading(false);
//     }
//   };

//   const handlePayment = async (event: React.MouseEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // Prepare payment data to be send to your backend
//       const paymentData = {
//         invoice_no: formData.invoiceNo,
//         itemSize: formData.itemSize,
//         total: formData.total,
//         status: formData.status,
//         order_id: formData.orderId,
//         // item_description: formData.itemDescription,
//       };
//       // Send payment data to local backend (port 4000)
//       const response = await fetch('http://localhost:4000/createPayment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save payment data');
//       }
//       // After successful backend save, create Stripe checkout session
//       await createCheckoutSession();
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       {/* Fixed Top Navigation */}
//       <div className="fixed-top">
//         <NavbarComponent />
//       </div>

//       {/* Main Scrollable Content */}
//       <div className="scrollable-content">
//         <div className="order-summary-container">
//           {/* Header without back button */}
//           <div className="header">
//             <h1 className="title">Order Summary</h1>
//           </div>

//           {/* Delivery Summary Section */}
//           <div className="delivery-summary">
//             <h2 className="section-title">Delivery Summary</h2>
//             <div className="summary-grid">
//               <div className="summary-item">
//                 <div className="summary-label">Name of Item</div>
//                 <div className="summary-value">{deliveryDetails.itemName}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Size of Delivery</div>
//                 <div className="summary-value">{deliveryDetails.size}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Quantity</div>
//                 <div className="summary-value">{deliveryDetails.quantity}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Status</div>
//                 <div className="summary-value">{deliveryDetails.status}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Order ID</div>
//                 <div className="summary-value">{deliveryDetails.orderId}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Description</div>
//                 <div className="summary-value">{deliveryDetails.description}</div>
//               </div>
//               <div className="summary-item">
//                 <div className="summary-label">Vehicle Selected</div>
//                 <div className="summary-value">{deliveryDetails.vehicle}</div>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Information */}
//           <div className="shipping-info">
//             <div className="section-header">
//               <h2 className="section-title">Shipping Information</h2>
//               <button
//                 className="change-button"
//                 onClick={() => navigate('/homepage')}
//               >
//                 Change <ChevronRightIcon />
//               </button>
//             </div>

//             <div className="address-container">
//               <div className="address-item">
//                 <div className="pin-icon pickup-pin">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1b1b1b" stroke="none">
//                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                   </svg>
//                 </div>
//                 <div className="address-details">
//                   <div className="address-label">Pickup</div>
//                   <p className="shipping-address">1234 Foster Rd, Ann Creek, New Mexico 29481</p>
//                 </div>
//               </div>

//               <div className="address-item">
//                 <div className="pin-icon dropoff-pin">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FECF30" stroke="none">
//                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                   </svg>
//                 </div>
//                 <div className="address-details">
//                   <div className="address-label">Dropoff</div>
//                   <p className="shipping-address">{shippingAddress}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="payment-method">
//             <h2 className="section-title">Payment Summary</h2>
//           </div>

//           {/* Cost Breakdown */}
//           <div className="cost-breakdown">
//             <div className="cost-row">
//               <span className="cost-label">Subtotal</span>
//               <span>${subtotal}</span>
//             </div>
//             <div className="cost-row">
//               <span className="cost-label">Delivery</span>
//               <span>${delivery}</span>
//             </div>
//             <div className="total-row">
//               <span>Total</span>
//               <span>${total}</span>
//             </div>
//           </div>

//           {/* Button Container */}
//           <div className="button-container">
//             <div className="pay-button-wrapper">
//               <PayButtonComponent
//                 onClick={handlePayment}
//                 loading={loading}
//               />
//             </div>
//             <div className="forgot-button-wrapper">
//               <ForgotButtonComponent
//                 onClick={handleForgot}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fixed Bottom Navigation */}
//       <div className="fixed-bottom">
//         <BottomNavComponent />
//       </div>
//     </div>
//   );
// };

// export default PaymentComponent;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import PayButtonComponent from './PayButtonComponent';
// import ForgotButtonComponent from './ForgotButtonComponent';
// import '../css/paymentform.css';
// import useOrderStore from '../store/orderStore';

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const PaymentComponent = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // Extract order data from the store:
//   const {
//     receiver_name,
//     pickup_address,
//     dropoff_address,
//     totalDistance,
//     parcelDetails,
//     total,
//     selectedVehicle,
//     user_id
//   } = useOrderStore((state) => ({
//     receiver_name: state.receiver_name,
//     pickup_address: state.pickup_address,
//     dropoff_address: state.dropoff_address,
//     totalDistance: state.totalDistance,
//     parcelDetails: state.parcelDetails,
//     total: state.total,
//     selectedVehicle: state.selectedVehicle,
//     user_id: state.user_id,
//   }));

//   const getSizeCategory = (dimensions) => {
//     // This is a simple example and may need adjustments based on your logic
//     if (!dimensions) return "Small"; // default
//     const { length, width, height } = dimensions;

//     // You could define some thresholds here:
//     if (length <= 50 && width <= 40 && height <= 50) return "SMALL";
//     if (length <= 210 && width <= 120 && height <= 110) return "MEDIUM";
//     if (length <= 310 && width <= 180 && height <= 180) return "LARGE";
//     if (length <= 600 && width <= 195 && height <= 195) return "EXTRA_LARGE";
//     return "CUSTOM";
//   };

//   // build the orderSummary:
//   const orderSummary = {
//     itemName: parcelDetails.itemName || "Package XYZ",
//     size: parcelDetails.length && parcelDetails.width && parcelDetails.height
//       ? getSizeCategory({
//           length: parcelDetails.length,
//           width: parcelDetails.width,
//           height: parcelDetails.height
//         })
//       : "Medium",  // default value
//     quantity: parcelDetails.quantity || "1",
//     status: "Ready for Pick up",
//     orderId: `ORD-${user_id || '123456'}`,
//     description: parcelDetails.description || "Fragile items - handle with care",
//     vehicle: selectedVehicle ? selectedVehicle.name : "N/A"
//   };

//     // Form data for payment (you might also merge store data here)
//     const [formData, setFormData] = useState({
//       invoiceNo: '',
//       itemSize: 'medium',
//       total: total || 1500,
//       orderId: orderSummary.orderId,
//       itemDescription: orderSummary.description,
//       status: 'Pending'
//     });

//   const handleForgot = (event: React.MouseEvent) => {
//     event.preventDefault();
//     // Navigate to the form page
//     navigate('/form');
//   };

//   const createCheckoutSession = async () => {
//     try {
//       const sizeMultiplier = {
//         small: 0.8,
//         medium: 1,
//         large: 1.2
//       };

//       const adjustedTotal = Math.round(formData.total * sizeMultiplier[formData.itemSize]);

//       const response = await fetch('/api/createPayment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: [{
//             name: `Order ${formData.orderId}`,
//             description: formData.itemDescription,
//             amount: adjustedTotal,
//             quantity: 1
//           }],
//           metadata: {
//             invoiceNo: formData.invoiceNo,
//             orderId: formData.orderId,
//             itemSize: formData.itemSize,
//             status: formData.status
//           }
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const { sessionId } = await response.json();

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ sessionId });

//       if (error) {
//         throw error;
//       }
//     } catch (error) {
//       console.error('Error creating checkout session:', error);
//       setLoading(false);
//     }
//   };

//   const handlePayment = async (event: React.MouseEvent) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const paymentData = {
//         invoice_no: formData.invoiceNo,
//         itemSize: formData.itemSize,
//         total: formData.total,
//         status: formData.status,
//         order_id: formData.orderId,
//         item_description: formData.itemDescription,
//       };

//       const response = await fetch('http://localhost:3000/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save payment data');
//       }

//       await createCheckoutSession();
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pageContainer">
//       <div className="scrollable-content">
//         <h1 className="pageTitle">Delivery Summary</h1>

//         <div className="summaryContainer">
//           <div className="summaryGrid">
//             <div className="summaryItem">
//               <div className="summaryLabel">Name of Item</div>
//               <div className="summaryValue">{deliveryDetails.itemName}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Size of Delivery</div>
//               <div className="summaryValue">{deliveryDetails.size}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Quantity</div>
//               <div className="summaryValue">{deliveryDetails.quantity}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Status</div>
//               <div className="summaryValue">{deliveryDetails.status}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Order ID</div>
//               <div className="summaryValue">{deliveryDetails.orderId}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Description</div>
//               <div className="summaryValue">{deliveryDetails.description}</div>
//             </div>
//             <div className="summaryItem">
//               <div className="summaryLabel">Vehicle Selected</div>
//               <div className="summaryValue">{deliveryDetails.vehicle}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="buttonContainer">
//         <div className="payButtonWrapper">
//           <PayButtonComponent
//             onClick={handlePayment}
//             loading={loading}
//           />
//         </div>
//         <div className="forgotButtonWrapper">
//           <ForgotButtonComponent
//             onClick={handleForgot}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentComponent;


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

const stripePublicKey = import.meta.env.VITE_STRIPE_KEY;

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
  const tax = 0;
  const total = subtotal + tax;

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

      const response = await fetch('/api/payments/createPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: `Order ${deliveryDetails.orderId}`,
            description: deliveryDetails.description,
            amount: adjustedTotal,
            quantity: 1
          }],
          metadata: {
            invoiceNo: `INV-${deliveryDetails.orderId}`,
            orderId: deliveryDetails.orderId,
            itemSize: deliveryDetails.size,
            status: deliveryDetails.status
          },
          success_url: window.location.origin + '/PaymentSuccess',
          cancel_url: window.location.origin + '/PaymentError'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1b1b1b" stroke="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="address-details">
                  <div className="address-label">Pickup</div>
                  <p className="shipping-address">{pickupAddress}</p>
                </div>
              </div>

              <div className="address-item">
                <div className="pin-icon dropoff-pin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FECF30" stroke="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="address-details">
                  <div className="address-label">Dropoff</div>
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
              <span className="cost-label">Tax</span>
              <span>${tax.toFixed(2)}</span>
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
                onClick={createCheckoutSession}
                loading={loading}
                onClick={() => navigate('/payment-form')}
              />
            </div>
            <div className="forgot-button-wrapper">
              <ForgotButtonComponent
                onClick={handleForgot}
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
