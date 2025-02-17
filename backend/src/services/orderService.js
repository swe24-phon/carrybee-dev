const prisma = require('../../prismaClient');
const { createParcel } = require('./parcelService');
const { geocodeAddress } = require('./geocodeService');

// Base price
const vehicle_price = {
    MOTORBIKE: 8.18,  // Rate taken from Lalamove-Hong Kong 
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
}

// Haversine Formula to Calculate Distance (in km)
function calculateDistance(pickup_lat, pickup_lon, dropoff_lat, dropoff_lon) {
  const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radian
  const R = 6371; // Earth's radius in km

  const dLat = toRad(dropoff_lat - pickup_lat);
  const dLon = toRad(dropoff_lon - pickup_lon);
  
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(pickup_lat)) * Math.cos(toRad(dropoff_lat)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;  // Distance in km
};

// Helper function to calculate price
const calculatePrice = (vehicleType, distance, weight) => {
  const basePrice = vehicle_price[vehicleType];
  const perKmRate = distanceRate[vehicleType];
  const perKgRate = weightRate[vehicleType];

  if (!basePrice || !perKmRate || !perKgRate) {
    throw new Error('Invalid vehicle type or parcel category')
  };
  const distanceFee = distance * perKmRate;
  const weightFee = weight * perKgRate;

  const totalPrice = basePrice + distanceFee + weightFee;
  return totalPrice.toFixed(2);

};

const createOrder = async (orderData) => {
  try {
    const {
      user_id,
      receiver_name,
      pickup_address,
      dropoff_address,
      pickup_date,
      vehicleType,
      parcelData,
    } = orderData

    console.log('Received order data:', orderData);

    const pickupCoords = await geocodeAddress(pickup_address);
    const dropoffCoords = await geocodeAddress(dropoff_address);

    console.log('Pickup coordinates:', pickupCoords, 'Dropoff coordinates:', dropoffCoords);

    if (
      !pickupCoords || !dropoffCoords || 
      typeof pickupCoords.lat !== 'number' || 
      typeof pickupCoords.lng !== 'number' ||
      typeof dropoffCoords.lat !== 'number' || 
      typeof dropoffCoords.lng !== 'number' || 
      pickupCoords.lat < -90 || pickupCoords.lat > 90 ||
      pickupCoords.lng < -180 || pickupCoords.lng > 180 ||
      dropoffCoords.lat < -90 || dropoffCoords.lat > 90 ||
      dropoffCoords.lng < -180 || dropoffCoords.lng > 180
    ) {
      throw new Error('Invalid geocoding response: Coordinates are out of range.');
    }


    const distance = calculateDistance(
      pickupCoords.lat,
      pickupCoords.lng,
      dropoffCoords.lat,
      dropoffCoords.lng
    );
    console.log('Calculated distance:', distance);

    const totalPrice = calculatePrice(vehicleType, distance, parcelData.weight, parcelData.category);

    console.log('Calculated total price:', totalPrice); 

    const { parcel } = await createParcel({ ...parcelData, user_id });
    console.log('Created parcel:', parcel); 

    const newOrder = await prisma.order.create({
      data: {
          receiver_name,
          pickup_address,
          dropoff_address,
          pickup_lat: pickupCoords.lat,
          pickup_lon: pickupCoords.lng,
          dropoff_lat: dropoffCoords.lat,
          dropoff_lon: dropoffCoords.lng,
          pickup_date,
          distance,
          total: parseFloat(totalPrice),
          status: 'PICKED_UP', // Default status
          user_id,
          parcel_id: parcel.id, // Linking parcel to order
      },
    });
    return { message: 'Order created successfully', order: newOrder };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create a new order');
  }
};

const getAllOrders = async () => {
  try {
    return await prisma.order.findMany();
  } catch (error) {
    throw new Error('Failed to get all orders');
  }
};

const getOrderById = async (id) => {
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new Error('Order not found')
    }
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Update Order

const updateOrder = async (id, updateData) => {
  try {
    const { receiver_name, pickup_address, dropoff_address, pickup_date } = updateData;
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        receiver_name: receiver_name || undefined,
        pickup_address: pickup_address || undefined,
        dropoff_address: dropoff_address || undefined,
        pickup_date: pickup_date || undefined,
      },
    });
    return { message: 'Order updated succesfully', order: updatedOrder};
   } catch (error) {
    throw new Error(error.message);
   }
};

// Delete Order
const deleteOrder = async (id) => {
  try {
    await prisma.order.delete({ where: { id }});
    return { message: 'Order deleted succesfully'};
  } catch (error) {
    throw new Error('Failed to delete order');
  }
};


module.exports = {
 createOrder,
 calculatePrice,
 calculateDistance,
 getAllOrders,
 getOrderById,
 updateOrder,
 deleteOrder,
};
