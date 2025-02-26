import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/parcels"; // 

export const createParcel = async (parcelData) => {
  try {
    const response = await axios.post(API_BASE_URL, parcelData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


