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
