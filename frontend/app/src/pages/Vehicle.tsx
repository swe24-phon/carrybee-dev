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
import VehicleTypeComponent from '../components/VehicleCardComponent';
import PrevButtonComponent from '../components/PreviousButton';
import ProceedButtonComponent from '../components/ProceedButton';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/orderStore';
import { calculatePrice } from '../js/calculatePrice';
import '../css/topnav.css';
import '../css/bottomnav.css';
import TestCalculationComponent from '../components/TestCalculationComponent';

interface PrevButtonProps {
  onClick: () => void;

}

const Vehicle = () => {

  const navigate = useNavigate(); // usage of useNavigate
  //Retrieve neccesary data from the store
  const { parcelDetails, selectedVehicle, distance, setTotal } = useOrderStore();
  const handleProceed = () => {
    // Extract weight from parcelDetails, adjust property name as needed
    const weight = parcelDetails.weight;
    if (!selectedVehicle || weight === undefined) {
      console.error("Vehicle type or parcel weight is missing");
      return;
    }
    const price = calculatePrice(selectedVehicle, weight, distance);
    // Update the store with the computed values
    setTotal(price);
    //Navigate to the payment store
    navigate('/Payment');
  };

  return (
    <>
      <NavbarComponent />
      <TestCalculationComponent/>
      <VehicleTypeComponent />
      <div id='vehicle-buttons' >
        <div id='prev-button'>
        <PrevButtonComponent onClick={() => navigate('/Form')}/>
        </div>
        <ProceedButtonComponent onClick={(handleProceed) => navigate('/Payment')}/>
      </div>
      <BottomNav />
    </>
  );
};

export default Vehicle;
