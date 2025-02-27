const prisma = require('../../prismaClient');
const { createParcel } = require('./parcelService');
const User = require('../services/userService');


const createOrder = async (orderData) => {
  try {
    const {
      user_id,
      receiver_name,
      pickup_address,
      dropoff_address,
      pickup_date,
      distance,
      vehicleType,
      total,
    } = orderData;

    console.log('Received order data:', orderData);

    // Transform the pickup_date to ISO 8601 format
    const formattedPickupDate = new Date(pickup_date).toISOString();

    // Transform total to float
    const formattedTotal = parseFloat(total);

    // Create the parcel first
    const { parcel } = await createParcel({ ...parcelData, user_id });
    console.log('Created parcel:', parcel);



model Order {
  pickup_date     DateTime?
  distance        Float?
  total           Float
  status          OrderStatus?
  img_url         String?
  user_id         String
  user            User          @relation(fields: [user_id], references: [id])
  parcel_id       String
  parcel          Parcel        @relation(fields: [parcel_id], references: [id])
  payment         Payment?
  review_id       String?       @unique
  review          Review?       @relation
  created_at      DateTime      @default(now())
  updated_at      DateTime      @updatedAt
}

    // Create the order using the transformed data
    const newOrder = await prisma.order.create({
      data: {
        user_id,
        receiver_name,
        pickup_address,
        dropoff_address,
        pickup_date: schedule// Use the transformed pickup_date
        distance: parseFloat(distance.toFixed(2)), // Ensure distance is a float with 2 decimals
        //vehicleType,
        total: formattedTotal, // Use the transformed total
        //status: 'PICKED_UP', // Default status
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
 getAllOrders,
 getOrderById,
 updateOrder,
 deleteOrder,
};
