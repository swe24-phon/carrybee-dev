import React from 'react';
import useOrderStore from '../store/orderStore';
import { calculatePrice } from '../js/calculatePrice';

const TestCalculationComponent = () => {
  const { totalDistance, parcelDetails, selectedVehicle } = useOrderStore();

  const testCalculation = () => {
    
    const distance = totalDistance;
    const weight = parcelDetails?.weight;
    const vehicleType = selectedVehicle?.type;

    console.log('Vehicle Type:', vehicleType); // Log vehicle type
    console.log('Weight:', weight); // Log parcel weight
    console.log('Distance:', distance); // Log calculated distance

    if (!vehicleType || weight === undefined || distance === undefined) {
      console.error('Missing vehicle or weight, or distance data');
      alert('Missing vehicle, weight, distance data');
      return;
    }

    try {
      const totalPrice = calculatePrice(vehicleType, distance, weight);
      console.log(`Test Calculation: ${totalPrice}`);
      alert(`Calculated Price: ${totalPrice}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={testCalculation}
      >
        Test Calculation
      </button>
    </div>
  );
};

export default TestCalculationComponent;
