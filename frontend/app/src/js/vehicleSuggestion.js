export const suggestVehicle = (parcelDetails, availableVehicles) => {
  const { length, width, height } = parcelDetails;
  const volume = length * width * height;

  // Define size limits for different parcel types
  const MOTORCYCLE_SIZE = 35 * 10 * 32; // Document or very small parcel
  const CAR_SIZE = 50 * 40 * 50; // Small parcel
  const VAN_SIZE = 210 * 120 * 110; // Medium parcel
  const TRUCK_SIZE = 310 * 180 * 180; // Large parcel

  if (volume <= MOTORCYCLE_SIZE) {
    // Suggest a motorcycle for small parcels
    return availableVehicles.find(v => v.type === 'Motorcycle') || null;
  } else if (volume <= CAR_SIZE) {
    // Suggest a car for small parcels
    return availableVehicles.find(v => v.type === 'Car') || null;
  } else if (volume <= VAN_SIZE) {
    // Suggest a van for medium parcels
    return availableVehicles.find(v => v.type === 'Van') || null;
  } else if (volume <= TRUCK_SIZE) {
    // Suggest a truck for large parcels
    return availableVehicles.find(v => v.type === 'Truck') || null;
  } else {
    // If the parcel is extremely large, suggest a ship
    return availableVehicles.find(v => v.type === 'Ship') || null;
  }
};
