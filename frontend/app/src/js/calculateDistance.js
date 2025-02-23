export const calculateDistance = (pickup_lat, pickup_lon, dropoff_lat, dropoff_lon) => {
    const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians
    const R = 6371; // Earth's radius in km
  
    const dLat = toRad(dropoff_lat - pickup_lat);
    const dLon = toRad(dropoff_lon - pickup_lon);
    
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(pickup_lat)) * Math.cos(toRad(dropoff_lat)) * Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;  // Distance in km
  };