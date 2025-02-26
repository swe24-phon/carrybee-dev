import { create } from 'zustand';
import { createOrder } from '../api/orderAPI';
import { v4 as uuidv4 } from 'uuid';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const useOrderStore = create((set) => ({
  user_id: null,
  receiver_name: null,
  pickup_address: null,
  dropoff_address: null,
  totalDistance: null,
  schedule: new Date("2025-02-20T14:30:00Z"), // Initializing with a sample schedule
  parcelId: '',
  parcelDetails: {
    height: '',
    length: '',
    width: '',
    description: '',
    item: '',
    quantity: '',
    weight: '',
  },
  total: null,
  selectedVehicle: null,
  status: 'idle',
  error: null,

  // Sync actions
  setReceiverName: (recipient) => {
    set((state) => {
      const newState = { ...state, receiver_name: recipient };
      console.log(recipient,'setReceiverName:', newState);
      return newState;
    });
  },
  setPickup: (pickup) => {
    set((state) => {
      const newState = { ...state, pickup_address: pickup };
      console.log(pickup,'setPickup:', newState);
      return newState;
    });
  },
  setParcelId: () => {
    set((state) => { 
      const newState = { ...state, parcelId: uuidv4() };
      console.log('setParcelId:', newState );
      return newState;
    });
  },
  // setPickupCoords: (coords) => {
  //   set((state) => {
  //     const newState = { ...state, pickup_coords: coords };
  //     console.log(coords,'setPickupCoords:', newState);
  //     return newState;
  //   });
  // },
  setDropoff: (dropoff) => {
    set((state) => {
      const newState = { ...state, dropoff_address: dropoff };
      console.log(dropoff,'setDropoff:', newState);
      return newState;
    });
  },
  // setDropoffCoords: (coords) => {
  //   set((state) => {
  //     const newState = { ...state, dropoff_coords: coords };
  //     console.log(coords,'setDropoffCoords:', newState);
  //     return newState;
  //   });
  // },
  setTotalDistance: (distance) => {
    set((state) => {
      const newState = { ...state, totalDistance: distance };
      console.log(distance,'setTotalDistance:', newState);
      return newState;
    });
  },
  setSchedule: (schedule) => {
    const parsedDate = new Date(schedule);
    set((state) => {
      const newState = { ...state, schedule: parsedDate };
      console.log(parsedDate,'setSchedule:', newState);
      return newState;
    });
  },
  setParcelDetails: (newParcelDetails) => {
    set((state) => {
      const newState = { ...state, parcelDetails: { ...state.parcelDetails, ...newParcelDetails} };
      console.log('setParcelDetails:', newState);
      return newState;
    });
  },
  setTotal: (total) => {
    const numericTotal = parseFloat(total);
    set((state) => {
      const newState = { ...state, total: numericTotal };
      console.log(numericTotal, 'setTotal:', newState);
      return newState;
    });
  },
  setSelectedVehicle: (vehicle) => {
    set((state) => {
      const newState = { ...state, selectedVehicle: vehicle };
      console.log(vehicle,'setSelectedVehicle:', newState);
      return newState;
    });
  },
  setUserID: (userID) => {
    set((state) => {
      const newState = {...state, user_id: userID };
      console.log(userID, 'setUserID:', newState);
      return newState;
    });
  },

  // updateOrderDetails: (details) => {
  //   set((state) => {
  //     const newState = { ...state, ...details };
  //     console.log(details,'updateOrderDetails:', newState);
  //     return newState;
  //   });
  // },

  resetOrder: () => {
    set((state) => {
      const newState = {
        ...state,
        user_id: null,
        receiver_name: null,
        pickup_address: null,
        dropoff_address: null,
        totalDistance: 0,
        schedule: new Date("2025-02-20T14:30:00Z"),
        parcelDetails: {},
        total: null,
        selectedVehicle: null,
        status: 'idle',
        error: null,
      };
      console.log('resetOrder:', newState);
      return newState;
    });
  },

  // Async action to submit the order
    submitOrder: async (orderData) => {
      set({ status: 'loading', error: null });
      try {
        const response = await createOrder(orderData);
        set({ status: 'succeeded' });
        // You can handle the response, e.g., storing the order details
      } catch (error) {
        set({ status: 'failed', error: error.response?.data || 'Error submitting order' });
      }
    },
}));

export default useOrderStore;