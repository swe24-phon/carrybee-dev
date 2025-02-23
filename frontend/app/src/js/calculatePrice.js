const vehicle_price = {
    MOTORBIKE: 8.18,  
    CAR: 10.22,
    VAN: 14.30,
    TRUCK: 22.48,
  };
  
  // Rate per KM 
  const distanceRate = {
    MOTORBIKE: 0.5, 
    CAR: 0.8,
    VAN: 1.2,
    TRUCK: 2,
  };
  
  // Weight surcharge
  const weightRate = {
    MOTORBIKE: 0.2,
    CAR: 0.3,
    VAN: 0.4,
    TRUCK: 0.6,
  };
  
  // Price Calculation Function
  export const calculatePrice = (vehicleType, distance, weight) => {
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