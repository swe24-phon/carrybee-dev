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
//         <PrevButtonComponent onClick={() => navigate('/Form')}/>
//         </div>
//         <ProceedButtonComponent onClick={() => navigate('/Payment')}/>
//       </div>
//       <BottomNav />
//     </>
//   );
// };

// export default Vehicle;

import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import BottomNav from '../components/BottomNavComponent';
import VehicleTypeComponent from '../components/vehicleCardComponent';
import PrevButtonComponent from '../components/PreviousButton';
import ProceedButtonComponent from '../components/ProceedButton';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore';
import { calculatePrice } from '../js/calculatePrice';
import '../css/topnav.css';
import '../css/bottomnav.css';
import TestCalculationComponent from '../components/TestCalculationComponent';
import { createOrder } from '../api/orderAPI';

interface PrevButtonProps {
  onClick: () => void;

}

const Vehicle = () => {

  const navigate = useNavigate(); // usage of useNavigate
  const handleProceed = async () => {

    // Grab the snapshot of the order data from the store
    const orderData = useOrderStore.getState();
    const { totalDistance, parcelDetails, selectedVehicle, userId, parcelId} = orderData;

    const distance = totalDistance;
    const weight = parcelDetails?.weight;
    const vehicleType = selectedVehicle?.type;

    console.log('Vehicle Type:', vehicleType); // Log vehicle type
    console.log('Weight:', weight); // Log parcel weight
    console.log('Distance:', distance); // Log calculated distance

    if (!vehicleType || weight === undefined || distance === undefined || !parcelId) {
      console.error('Missing vehicle or weight,distance or parcelID');
      alert('Missing vehicle, weight, distance or parcelID');
      return;
    }

    try {
      const totalPrice = calculatePrice(vehicleType, distance, weight);
      console.log(`Total Price: ${totalPrice}`);
      alert(`Calculated Price: ${totalPrice}`);
      // Update the store with the calculated total
      useOrderStore.getState().setTotal(totalPrice);

          // Include userId and parcelId in the order data
      const orderDataWithIds = {
      ...orderData,
      userId,
      parcelId, // Ensure parcelId is included here
    };
      // Submit the order data to the backend using the API function
      await createOrder(orderDataWithIds);
      console.log('Order submitted successfully');

     // setTotal(totalPrice);
      navigate('/Payment');

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };


  return (
    <>
      <NavbarComponent />
      <VehicleTypeComponent />
      <div id='vehicle-buttons' >
        <div id='prev-button'>
        <PrevButtonComponent onClick={() => navigate('/Form')}/>
        </div>
        <ProceedButtonComponent onClick={handleProceed}/>
      </div>
      <BottomNav />
    </>
  );
};

export default Vehicle;
