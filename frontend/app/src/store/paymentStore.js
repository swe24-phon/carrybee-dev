// import { create } from 'zustand';
// import axios from 'axios';
// import useOrderStore from './orderStore';
// import useParcelStore from './parcelStore';

// const usePaymentStore = create((set, get) => ({
//   paymentDetails: {
//     invoice_no: '',
//     item_name: '',
//     item_size: '',
//     quantity: 1,
//     total: 0,
//     status: '',
//     order_id: '',
//     user_id: null,
//     parcel_id: '',
//     pickup_address: '',
//     dropoff_address: '',
//   },

//   setPaymentDetails: () => {
//     // Get current state from other stores
//     const orderStore = useOrderStore.getState();
//     const parcelStore = useParcelStore.getState();
    
//     const orderDetails = orderStore.orderDetails;
//     const parcelDetails = parcelStore.parcelDetails;
    
//     // Generate an invoice number based on the order ID
//     const invoiceNo = `INV-${orderDetails.parcel_id || Date.now()}`;
    
//     set({
//       paymentDetails: {
//         invoice_no: invoiceNo,
//         item_name: parcelDetails.item_name,
//         item_size: parcelDetails.category,
//         quantity: parcelDetails.quantity,
//         total: orderDetails.total,
//         status: orderDetails.status,
//         order_id: orderDetails.parcel_id,
//         user_id: orderDetails.user_id,
//         parcel_id: orderDetails.parcel_id,
//         pickup_address: orderDetails.pickup_address,
//         dropoff_address: orderDetails.dropoff_address,
//       }
//     });
    
//     console.log('💰 Payment details set:', get().paymentDetails);
//   },
  
//   submitPayment: async () => {
//     try {
//       const { paymentDetails } = get();
      
//       // First send payment data to your backend
//       const backendResponse = await axios.post('/api/payments', paymentDetails);
      
//       if (!backendResponse.data || !backendResponse.data.sessionId) {
//         throw new Error('Invalid response from payment API');
//       }
      
//       console.log('✅ Payment created successfully:', backendResponse.data);
      
//       // Return the Stripe session ID for the frontend to use with redirectToCheckout
//       return backendResponse.data;
      
//     } catch (error) {
//       console.error('❌ Error creating payment:', error);
//       throw error;
//     }
//   },
  
//   resetPayment: () => {
//     set({
//       paymentDetails: {
//         invoice_no: '',
//         item_name: '',
//         item_size: '',
//         quantity: 1,
//         total: 0,
//         status: '',
//         order_id: '',
//         user_id: null,
//         parcel_id: '',
//         pickup_address: '',
//         dropoff_address: '',
//       }
//     });
//   }
// }));

// export default usePaymentStore;

import { create } from 'zustand';
import axios from 'axios';
import useOrderStore from './orderStore';
import useParcelStore from './parcelStore';

const API_BASE_URL = 'http://localhost:4000/api';

const usePaymentStore = create((set, get) => ({
  paymentDetails: {
    invoice_no: '',
    item_name: '',
    item_size: '',
    quantity: 1,
    total: 0,
    status: '',
    order_id: '',
    user_id: null,
    parcel_id: '',
    pickup_address: '',
    dropoff_address: '',
  },

  setPaymentDetails: () => {
    const orderStore = useOrderStore.getState();
    const parcelStore = useParcelStore.getState();
  
    const orderDetails = orderStore.orderDetails;
    const parcelDetails = parcelStore.parcelDetails;
  
    const invoiceNo = `INV-${Date.now()}`; // Generate unique invoice number
  
    set({
      paymentDetails: {
        invoice_no: invoiceNo,
        item_name: parcelDetails.item_name || "Unknown Item",
        item_size: parcelDetails.category || "Not Specified",
        quantity: parcelDetails.quantity || 1,
        total: orderDetails.total || 0,
        status: orderDetails.status || "PENDING",
        order_id: orderDetails.order_id || "", // 
        user_id: orderDetails.user_id || parcelDetails.user_id ||  null, 
        parcel_id: parcelDetails.parcel_id || "", // 
        pickup_address: orderDetails.pickup_address || "Unknown",
        dropoff_address: orderDetails.dropoff_address || "Unknown",
      }
    });
  
    console.log('💰 Payment details set:', get().paymentDetails);
  },
  

  submitPayment: async () => {
    try {
      const { paymentDetails } = get();
      
      const response = await axios.post(`${API_BASE_URL}/payments`, paymentDetails);
      
      if (!response.data?.sessionId) {
        throw new Error('Invalid response from payment API');
      }

      console.log('✅ Payment created successfully:', response.data);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Error creating payment:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment creation failed');
    }
  },

  resetPayment: () => {
    set({
      paymentDetails: {
        invoice_no: '',
        item_name: '',
        item_size: '',
        quantity: 1,
        total: 0,
        status: '',
        order_id: '',
        user_id: null,
        parcel_id: '',
        pickup_address: '',
        dropoff_address: '',
      }
    });
  }
}));

export default usePaymentStore;
