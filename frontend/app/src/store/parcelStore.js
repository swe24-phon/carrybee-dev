import { create } from 'zustand';
import axios from 'axios';

const useParcelStore = create((set) => ({
  parcelDetails: {
    item_name: '',
    category: '',
    quantity: 1,
    weight: 0,
    width: 0,
    length: 0,
    height: 0,
    description: '',
    user_id: null,
  },
  parcel_id: '',

  setParcelDetails: (newParcelDetails) => {
    set((state) => {
      const newState = { ...state, parcelDetails: { ...state.parcelDetails, ...newParcelDetails} };
      console.log('setParcelDetails:', newState);
      return newState;
    });
  },

  setParcelID: (parcelID) => {
    set((state) => ({
      parcelDetails: { ...state.parcelDetails, parcel_id: parcelID }
    }));
  },

  setUserID: (userID) => {
    set((state) => ({
      parcelDetails: { ...state.parcelDetails, user_id: userID }
    }));
  },

  submitParcel: async (endpoint) => {
    try {
      const { parcelDetails } = useParcelStore.getState();
      const response = await axios.post(endpoint, parcelDetails);
      set({ parcelId: response.data.id });
      console.log('✅ Parcel created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating parcel:', error);
      throw error;
    }
  },

  resetParcel: () => {
    set({
      parcelDetails: {
        item_name: '',
        category: '',
        quantity: 1,
        weight: 0,
        width: 0,
        length: 0,
        height: 0,
        description: '',
        user_id: null,
      },
      parcelId: '',
    });
  },
}));

export default useParcelStore;
