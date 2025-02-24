// Vlad to do
// Using the user template, modify for driver...

const prisma = require('../../prismaClient');


// Create Driver
const createDriver = async (userDriver) => {
  try {
    // What are driverOrders??
    const { first_name, last_name, vehicle_type, availability, orders, reviews, driverOrders } = userDriver
    
    const newDriver = await prisma.driver.create({
        data: {
            first_name,
            last_name,
            vehicle_type,
            availability,
            orders,
            reviews,
            driverOrders
            },
      });
    // Return the result to controller
    return { message: 'Driver created successfully', driver: newDriver };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get Driver by availability
const getDriverByAvailability = async (availability) => {
  try {
    const driver = await prisma.driver.findUnique({ where: { availability } });
    if (!driver) {
      throw new Error('Driver not found');
    }
    return driver; // Return the new object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Drivers
const getAllDrivers = async () => {
  try {
    return await prisma.driver.findMany();
    // Map through users to exclude passwords
  } catch (error) {
    throw new Error('Failed to get all Drivers');
  }
};

//Additional option to simply
//update the driver's availability

// Update Driver
const updateDriver = async (id, updateData) => {
  try {
    const { first_name, last_name, vehicle_type, availability, orders, reviews, driverOrders } = updateData;
    
    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: {
        first_name: first_name || undefined, // If the value is provided, use it, otherwise skip it
        last_name: last_name || undefined,
        vehicle_type: vehicle_type || undefined,
        availability: availability || undefined,            
        orders: orders || undefined,
        reviews: reviews || undefined,
        driverOrders: driverOrders || undefined
        },
    });
    
    return updatedDriver;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Driver
const deleteDriver = async (id) => {
  try {
    await prisma.driver.delete({ where: { id }});
    return {message: 'Driver deleted successfully'};
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

module.exports = {
    createDriver,
    getDriverByAvailability,
    getAllDrivers,
    updateDriver,
    deleteDriver,
  };