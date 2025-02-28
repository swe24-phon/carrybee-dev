// import { create } from 'zustand';
// import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
// import axios from "axios";


// const useOrderStore = create((set) => ({
//   user_id: null,
//   receiver_name: null,
//   pickup_address: null,
//   dropoff_address: null,
//   totalDistance: null,
//   schedule: new Date("2025-02-20T14:30:00Z"), // Initializing with a sample schedule
//   parcelId: '',
//   parcelDetails: {
//     height: '',
//     length: '',
//     width: '',
//     description: '',
//     item: '',
//     quantity: '',
//     weight: '',
//   },
//   total: null,
//   selectedVehicle: null,
//   status: 'idle',
//   error: null,

//   // Sync actions
//   setReceiverName: (recipient) => {
//     set((state) => {
//       const newState = { ...state, receiver_name: recipient };
//       console.log(recipient,'setReceiverName:', newState);
//       return newState;
//     });
//   },
//   setPickup: (pickup) => {
//     set((state) => {
//       const newState = { ...state, pickup_address: pickup };
//       console.log(pickup,'setPickup:', newState);
//       return newState;
//     });
//   },
//   setParcelId: (id) => {
//     set((state) => {
//       const parcelId = id; // Use provided ID
//       const newState = { ...state, parcelId };
//       console.log('setParcelId:', newState);
//       return newState;
//     });
//   },
  

//   setDropoff: (dropoff) => {
//     set((state) => {
//       const newState = { ...state, dropoff_address: dropoff };
//       console.log(dropoff,'setDropoff:', newState);
//       return newState;
//     });
//   },

//   setTotalDistance: (distance) => {
//     set((state) => {
//       const newState = { ...state, totalDistance: distance };
//       console.log(distance,'setTotalDistance:', newState);
//       return newState;
//     });
//   },
//   setSchedule: (schedule) => {
//     const parsedDate = new Date(schedule);
//     set((state) => {
//       const newState = { ...state, schedule: parsedDate };
//       console.log(parsedDate,'setSchedule:', newState);
//       return newState;
//     });
//   },
//   setParcelDetails: (newParcelDetails) => {
//     set((state) => {
//       const newState = { ...state, parcelDetails: { ...state.parcelDetails, ...newParcelDetails} };
//       console.log('setParcelDetails:', newState);
//       return newState;
//     });
//   },
//   setTotal: (total) => {
//     const numericTotal = parseFloat(total);
//     set((state) => {
//       const newState = { ...state, total: numericTotal };
//       console.log(numericTotal, 'setTotal:', newState);
//       return newState;
//     });
//   },
//   setSelectedVehicle: (vehicle) => {
//     set((state) => {
//       const newState = { ...state, selectedVehicle: vehicle };
//       console.log(vehicle,'setSelectedVehicle:', newState);
//       return newState;
//     });
//   },
//   setUserID: (userID) => {
//     set((state) => {
//       const newState = {...state, user_id: userID };
//       console.log(userID, 'setUserID:', newState);
//       return newState;
//     });
//   },

//   // updateOrderDetails: (details) => {
//   //   set((state) => {
//   //     const newState = { ...state, ...details };
//   //     console.log(details,'updateOrderDetails:', newState);
//   //     return newState;
//   //   });
//   // },

//   resetOrder: () => {
//     set((state) => {
//       const newState = {
//         ...state,
//         user_id: null,
//         receiver_name: null,
//         pickup_address: null,
//         dropoff_address: null,
//         totalDistance: 0,
//         schedule: new Date("2025-02-20T14:30:00Z"),
//         parcelDetails: {},
//         total: null,
//         selectedVehicle: null,
//         status: 'idle',
//         error: null,
//       };
//       console.log('resetOrder:', newState);
//       return newState;
//     });
//   },

// //   // Async action to submit the order
// //     submitOrder: async (orderData) => {
// //       set({ status: 'loading', error: null });
// //       try {
// //         const response = await createOrder(orderData);
// //         set({ status: 'succeeded' });
// //         // You can handle the response, e.g., storing the order details
// //       } catch (error) {
// //         set({ status: 'failed', error: error.response?.data || 'Error submitting order' });
// //       }
// //     },
// // }));

//   // Generalized function for submitting data
//   submitData: async (dataToSend, endpoint) => {
//     set({ status: 'loading', error: null });

//     try {
//       const response = await axios.post(endpoint, dataToSend);
//       set({ status: 'succeeded', orderData: response.data });

//       // Log response in the store
//       console.log('✅ Data submitted successfully:', response.data);
//       return response.data;  // Return the response to use where needed
//     } catch (error) {
//       console.error('❌ Error sending data:', error);
//       set({ status: 'failed', error: error.response?.data || 'Error submitting data' });
//       throw error;  // Throw error for further handling if needed
//     }
//   },
// }));

// export default useOrderStore;

// OrderStore.js
import { create } from 'zustand';
import axios from 'axios';
import useParcelStore from './parcelStore';  // import parcel store


const useOrderStore = create((set) => ({
  orderDetails: {
    receiver_name: '',
    pickup_address: '',
    dropoff_address: '',
    pickup_date: new Date(),
    distance: 0,
    total: 0,
    vehicleType: '',
    status: 'idle',
    user_id: null,
    parcel_id: '',
    vehicleType: '',
    weight: 0,
    width: 0,
    length: 0,
    height: 0,
  },

  setReceiverName: (recipient) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, receiver_name: recipient }
    }));
  },

  setPickup: (pickup) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, pickup_address: pickup }
    }));
  },

  setParcelId: (id) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, parcel_id: id }
    }));
  },

  setDropoff: (dropoff) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, dropoff_address: dropoff }
    }));
  },

  setTotalDistance: (distance) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, distance: distance }
    }));
  },

  setSchedule: (schedule) => {
    const parsedDate = new Date(schedule);
    set((state) => ({
      orderDetails: { ...state.orderDetails, pickup_date: parsedDate }
    }));
  },

  setUserID: (userID) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, user_id: userID }
    }));
  },

  setTotal: (total) => {
    const numericTotal = parseFloat(total);
    set((state) => ({
      orderDetails: { ...state.orderDetails, total: numericTotal }
    }));
  },

  setSelectedVehicle: (vehicleType) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, selectedVehicle: vehicleType }
    }));
  },

  // Method to sync parcel details from parcelStore
  setParcelDetails: () => {
    const { weight, width, length, height } = useParcelStore.getState();  // Assuming parcel store has these
    set((state) => ({
      orderDetails: {
        ...state.orderDetails,
        weight, // Set the weight from parcelStore to orderDetails
        width,
        length,
        heigth,
      }
    }));
  },

  submitOrder: async (endpoint) => {
    try {
      const { orderDetails } = useOrderStore.getState();
      const response = await axios.post(endpoint, orderDetails);
      console.log('✅ Order created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating order:', error);
      throw error;
    }
  },

  resetOrder: () => {
    set({
      orderDetails: {
        receiver_name: '',
        pickup_address: '',
        dropoff_address: '',
        pickup_date: new Date(),
        distance: 0,
        total: 0,
        vehicleType: '',
        status: 'idle',
        user_id: null,
        parcel_id: '',
        selectedVehicle: '', // Keep this consistent with initial state
      }
    });
  },
}));

export default useOrderStore;
