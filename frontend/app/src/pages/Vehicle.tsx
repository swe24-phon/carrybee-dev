// import React from 'react';
// import NavbarComponent from '../components/NavbarComponent';
// import BottomNav from '../components/BottomNavComponent';
// import VehicleTypeComponent from '../components/VehicleCardComponent';
// import PrevButtonComponent from '../components/PreviousButton';
// import ProceedButtonComponent from '../components/ProceedButton';
// import { useNavigate } from 'react-router-dom';
// import '../css/topnav.css';
// import '../css/bottomnav.css';

// interface PrevButtonProps {
//   onClick: () => void;

// }

// const Vehicle = () => {
//   const navigate = useNavigate(); // usage of useNavigate
//   return (
//     <>
//       <NavbarComponent />
//       <VehicleTypeComponent />
//       <div id='vehicle-buttons' >
//         <div id='prev-button'>
//         <PrevButtonComponent onClick={() => navigate('form')}/>
//         </div>
//         <ProceedButtonComponent onClick={() => navigate('/payment')}/>
//       </div>
//       <BottomNav />
//     </>
//   );
// };

// export default Vehicle;



// const Vehicle = () => {

//   const navigate = useNavigate(); // usage of useNavigate
//   const handleProceed = async () => {

//     // Grab the snapshot of the order data from the store
//     const orderData = useOrderStore.getState();
//     const { totalDistance, parcelDetails, selectedVehicle, userId, parcelId} = orderData;

//     const distance = totalDistance;
//     const weight = parcelDetails?.weight;
//     const vehicleType = selectedVehicle?.type;

//     console.log('Vehicle Type:', vehicleType); // Log vehicle type
//     console.log('Weight:', weight); // Log parcel weight
//     console.log('Distance:', distance); // Log calculated distance

//     if (!vehicleType || weight === undefined || distance === undefined || !parcelId) {
//       console.error('Missing vehicle or weight,distance or parcelID');
//       alert('Missing vehicle, weight, distance or parcelID');
//       return;
//     }

//     try {
//       const totalPrice = calculatePrice(vehicleType, distance, weight);
//       console.log(`Total Price: ${totalPrice}`);
//       alert(`Calculated Price: ${totalPrice}`);
//       // Update the store with the calculated total
//       useOrderStore.getState().setTotal(totalPrice);

//           // Include userId and parcelId in the order data
//       const orderDataWithIds = {
//       ...orderData,
//       userId,
//       parcelId, // Ensure parcelId is included here
//     };
//       // Submit the order data to the backend using the API function
//       await createOrder(orderDataWithIds);
//       console.log('Order submitted successfully');

//      // setTotal(totalPrice);
//       navigate('/payment');

//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };


//   return (
//     <>
//       <NavbarComponent />
//       <VehicleTypeComponent />
//       <di
// export default Vehicle;


import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNavComponent from '../components/BottomNavComponent';
import VehicleCardComponent from '../components/VehicleCardComponent';
import PreviousButtonComponent from '../components/PreviousButtonComponent';
import ProceedButtonComponent from '../components/ProceedButtonComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import useOrderStore from '../store/orderStore';
import useParcelStore from '../store/parcelStore';
import { calculatePrice } from '../js/calculatePrice';
import '../css/topnav.css';
import '../css/bottomnav.css';
import axios from 'axios';

const Vehicle = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleProceed = async () => {
    const orderData = useOrderStore.getState();
    const parcelData = useParcelStore.getState();

  // Get parcel ID from either navigation state or store
    const parcelID = location.state?.parcelID || parcelData.parcelID;

    const distance = orderData.orderDetails?.totalDistance;
    const weight = parcelData.parcelDetails?.weight;
    const vehicleType = orderData.orderDetails?.selectedVehicle?.name;

    console.log('Vehicle Type:', vehicleType);
    console.log('Weight:', weight);
    console.log('Distance:', distance);

    if (!vehicleType || weight === undefined || distance === undefined) {
      console.error('❌ Missing vehicle, weight, or distance data');
      alert('Missing vehicle, weight, or distance data');
      return;
    }

    try {
      const totalPrice = calculatePrice(vehicleType, distance, weight);
      console.log(`💰 Total Price: ${totalPrice}`);
      alert(`Calculated Price: ${totalPrice}`);

      useOrderStore.getState().setTotal(totalPrice);

      const partialData = {
        receiver_name: orderData.orderDetails?.receiver_name || "Default Name",
        pickup_address: orderData.orderDetails?.pickup_address || "Default Pickup Address",
        dropoff_address: orderData.orderDetails?.dropoff_address || "Default Dropoff Address",
        pickup_date: orderData.orderDetails?.schedule || new Date().toISOString(),
        total: totalPrice || 0,
        distance: orderData.orderDetails?.totalDistance || "0",
        vehicleType: orderData.orderDetails?.selectedVehicle?.name || "Default vehicle",
        user_id: parcelData.parcelDetails?.user_id || "User ID",
        parcel_id: parcelID || "Parcel ID"
      };

      console.log('Payload being sent:', partialData);

      const response = await axios.post('http://localhost:4000/api/orders', partialData);
      console.log('Data successfully saved:', response.data);

      navigate('/payment');

    } catch (error: any) {
      console.error('Error saving data to the database:', error.response?.data ?? error.message);
    }
  };

  return (
    <>
      <NavbarComponent />
      <VehicleCardComponent />
      <div id='vehicle-buttons'>
        <div id='prev-button'>
          <PreviousButtonComponent onClick={() => navigate('/form')}
            />
        </div>
        <ProceedButtonComponent onClick={handleProceed} />
      </div>
      <BottomNavComponent />
    </>
  );
};

export default Vehicle;
