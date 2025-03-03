// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api/';

// export const paymentApi = {
//   // Create payment intent
//   createPaymentIntent: async (paymentData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Payment intent creation failed');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       throw error;
//     }
//   },

//   // Process payment
//   processPayment: async (paymentData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Payment processing failed');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       throw error;
//     }
//   },

//   // Get payment status
//   getPaymentStatus: async (paymentId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch payment status');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching payment status:', error);
//       throw error;
//     }
//   },

//   // Update payment details
//   updatePayment: async (paymentId, updateData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update payment');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error updating payment:', error);
//       throw error;
//     }
//   },

//   // Cancel payment
//   cancelPayment: async (paymentId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/cancel`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to cancel payment');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error canceling payment:', error);
//       throw error;
//     }
//   }
// };

// export default paymentApi;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// Helper function to handle errors consistently
const handleApiError = (error, defaultMessage) => {
  console.error(defaultMessage, error.response?.data || error.message);
  const errorMessage = error.response?.data?.error || 
                      error.response?.data?.message || 
                      defaultMessage;
  throw new Error(errorMessage);
};

export const paymentApi = {
  // Create Stripe checkout session
  createCheckoutSession: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments`, paymentData);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create checkout session');
    }
  },
  
  // Get payment by ID
  getPayment: async (paymentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch payment details');
    }
  },
  
  // Get payment by order ID
  getPaymentByOrderId: async (orderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/order/${orderId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch payment for this order');
    }
  },
  
  // Verify payment status after redirect from Stripe
  verifyPaymentStatus: async (sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments/verify/${sessionId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to verify payment status');
    }
  },
  
  // Request payment refund (admin only)
  requestRefund: async (paymentId, reason) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/${paymentId}/refund`, { reason });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to process refund request');
    }
  }
};

export default paymentApi;