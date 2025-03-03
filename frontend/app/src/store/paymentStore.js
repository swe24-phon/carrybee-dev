import { create } from 'zustand';
import axios from 'axios';
import useOrderStore from './orderStore';
import useParcelStore from './parcelStore';

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
    // Get current state from other stores
    const orderStore = useOrderStore.getState();
    const parcelStore = useParcelStore.getState();
    
    const orderDetails = orderStore.orderDetails;
    const parcelDetails = parcelStore.parcelDetails;
    
    // Generate an invoice number based on the order ID
    const invoiceNo = `INV-${orderDetails.parcel_id || Date.now()}`;
    
    set({
      paymentDetails: {
        invoice_no: invoiceNo,
        item_name: parcelDetails.item_name,
        item_size: parcelDetails.category,
        quantity: parcelDetails.quantity,
        total: orderDetails.total,
        status: orderDetails.status,
        order_id: orderDetails.parcel_id,
        user_id: orderDetails.user_id,
        parcel_id: orderDetails.parcel_id,
        pickup_address: orderDetails.pickup_address,
        dropoff_address: orderDetails.dropoff_address,
      }
    });
    
    console.log('💰 Payment details set:', get().paymentDetails);
  },
  
  submitPayment: async () => {
    try {
      const { paymentDetails } = get();
      
      // First send payment data to your backend
      const backendResponse = await axios.post('/api/payments/createPayment', paymentDetails);
      
      if (!backendResponse.data || !backendResponse.data.sessionId) {
        throw new Error('Invalid response from payment API');
      }
      
      console.log('✅ Payment created successfully:', backendResponse.data);
      
      // Return the Stripe session ID for the frontend to use with redirectToCheckout
      return backendResponse.data;
      
    } catch (error) {
      console.error('❌ Error creating payment:', error);
      throw error;
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