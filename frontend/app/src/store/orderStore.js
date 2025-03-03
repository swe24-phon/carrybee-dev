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
  order_id: '',

  setReceiverName: (recipient) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, receiver_name: recipient }
    }));
  },

  // setOrderID: (id) => {
  //   set((state) => ({
  //     orderDetails: { ...state.orderDetails, order_id: id }
  //   }));
  // },

  setPickup: (pickup) => {
    set((state) => ({
      orderDetails: { ...state.orderDetails, pickup_address: pickup }
    }));
  },

  setParcelID: (id) => {
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
      orderDetails: { ...state.orderDetails, totalDistance: distance }
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
        height,
      }
    }));
  },

  submitOrder: async (endpoint) => {
    try {
      const { orderDetails } = useOrderStore.getState();
      const response = await axios.post(endpoint, orderDetails);

      if (response.data && response.data.order_id) {
        set((state) => ({
          orderDetails: { ...state.orderDetails, order_id: response.data.order_id }
        }));
      }

      console.log('✅ Order created successfully:', response.data.order_id);
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
