export const calculatePrice = (vehicleType, distance, weight) => {
const vehicle_price = {
    Motorcycle: 8.18,  
    Car: 10.22,
    Van: 14.30,
    Truck: 22.48,
    Ship: 50.0,
  };
  
  // Rate per KM 
  const distanceRate = {
    Motorcycle: 0.5, 
    Car: 0.8,
    Van: 1.2,
    Truck: 2,
    Ship: 10,
  };
  
  // Weight surcharge
  const weightRate = {
    Motorcycle: 0.2,
    Car: 0.3,
    Van: 0.4,
    Truck: 0.6,
    Ship: 1.0,
  };
  
  // Price Calculation Function
    const basePrice = vehicle_price[vehicleType];
    const perKmRate = distanceRate[vehicleType];
    const perKgRate = weightRate[vehicleType];
  
    if (!basePrice || !perKmRate || !perKgRate) {
      throw new Error('Invalid vehicle type or parcel weight');
    }
  
    const distanceFee = distance * perKmRate;
    const weightFee = weight * perKgRate;
    const totalPrice = basePrice + distanceFee + weightFee;
  
    return totalPrice.toFixed(2); // Round to 2 decimal places
  };

export default calculatePrice;