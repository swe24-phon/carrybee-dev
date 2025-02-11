const prisma = require('../../prismaClient');

// Helper function to calculate price
const vehicleBasePrices = {
    MOTORBIKE: 8.18,  // Rate taken from Lalamove-Hong Kong 
    CAR: 10.22,
    VAN: 14.30,
    TRUCK: 22.48,
 };

const calculatePrice = (vehicleType, distance, weight, size) => {

  let basePrice = vehicleBasePrices[vehicleType];
  if (!basePrice) {
    throw new Error('Invalid vehicle type')
  }

};
