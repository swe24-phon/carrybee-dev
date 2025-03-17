// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';
// import '../css/vehicleOptions.css';
// import useOrderStore from '../store/orderStore';


// const VehicleType = () => {
//   const selectedVehicle = useOrderStore((state) => state.selectedVehicle); // Get selected vehicle from state
//   const setSelectedVehicle = useOrderStore((state) => state.setSelectedVehicle) // Set selected vehicle from function

//   const availableVehicles = [
//     { id: 1, type: 'motorcycle', name: 'Motorcycle', icon: faMotorcycle },
//     { id: 2, type: 'car', name: 'Car', icon: faCarSide },
//     { id: 3, type: 'van', name: 'Van', icon: faVanShuttle },
//     { id: 4, type: 'truck', name: 'Truck', icon: faTruckPickup },
//     { id: 5, type: 'ship', name: 'Ship', icon: faShip },
//     { id: 6, type: 'helicopter', name: 'Helicopter', icon: faHelicopter },
//   ];

//   const handleCardClick = (vehicle) => {
//     setSelectedVehicle(vehicle);
//     console.log('Vehicle selected:', vehicle);
//   }

//   return (
//     <>
//       <h1 id="type" className="text-xl font-bold text-center">Available Vehicles</h1>
//       <div id="vehicle-cards" className="grid grid-cols-2 gap-4 p-4">
//         {availableVehicles.map((vehicle) => {
//           const isSelected = selectedVehicle && selectedVehicle.id === vehicle.id;
//           return (
//             <div
//               key={vehicle.id}
//               className={`icon-box ${isSelected ? 'selected' : ''}`}
//               onClick={() => handleCardClick(vehicle)} // Trigger selection on click
//             >
//               <FontAwesomeIcon icon={vehicle.icon} className="vehicle-icon" />
//               <p>{vehicle.name}</p>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default VehicleType;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCarSide, faVanShuttle, faTruckPickup, faShip, faHelicopter } from '@fortawesome/free-solid-svg-icons';
import '../css/vehicleOptions.css';
import useOrderStore from '../store/orderStore';

const VehicleType = () => {
  const selectedVehicle = useOrderStore((state) => state.selectedVehicle); // Get selected vehicle from state
  const setSelectedVehicle = useOrderStore((state) => state.setSelectedVehicle); // Set selected vehicle from function

  const availableVehicles = [
    { id: 1, type: 'motorcycle', name: 'Motorcycle', icon: faMotorcycle },
    { id: 2, type: 'car', name: 'Car', icon: faCarSide },
    { id: 3, type: 'van', name: 'Van', icon: faVanShuttle },
    { id: 4, type: 'truck', name: 'Truck', icon: faTruckPickup },
    { id: 5, type: 'ship', name: 'Ship', icon: faShip },
    { id: 6, type: 'helicopter', name: 'Helicopter', icon: faHelicopter },
  ];

  const handleCardClick = (vehicle) => {
    if (!selectedVehicle) {
      setSelectedVehicle(vehicle); // Only allow setting vehicle if none is selected
      console.log('Vehicle selected:', vehicle);
    }
  };

  return (
    <>
      <h1 id="type" className="text-xl font-bold text-center">Available Vehicles</h1>
      <div id="vehicle-cards" className="grid grid-cols-2 gap-4 p-4">
        {availableVehicles.map((vehicle) => {
          const isSelected = vehicle.type === 'motorcycle'; // Always select motorcycle
          const isDisabled = vehicle.type !== 'motorcycle'; // Disable other vehicles

          return (
            <div
              key={vehicle.id}
              className={`icon-box ${isSelected ? 'selected' : isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && handleCardClick(vehicle)} // Disable click for unselected vehicles
              style={{
                pointerEvents: isDisabled ? 'none' : 'auto', // Disable interaction on other vehicles
                opacity: isDisabled ? 0.5 : 1, // Make disabled cards gray (lower opacity)
                border: isSelected ? '3px solid black' : '1px solid #ccc', // Highlight selected card with blue border
                boxShadow: isSelected ? '0px 0px 15px rgba(255, 208, 0, 0.72)' : 'none', // Add shadow for selected card
                transition: 'all 0.3s ease', // Smooth transition between states
              }}
            >
              <FontAwesomeIcon icon={vehicle.icon} className="vehicle-icon" />
              <p>{vehicle.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VehicleType;
