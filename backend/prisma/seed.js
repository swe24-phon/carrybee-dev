const { PrismaClient, ParcelCategory, OrderStatus, VehicleType, PaymentStatus } = require('@prisma/client');
const prisma = require('../prismaClient');

async function main () {
  console.log('Seeding database...');
  // Create user 
  const user = await prisma.user.create ({
    data: {
        first_name: 'Andrew',
        last_name: 'Bedford',
        phone: '6353527',
        email: 'andrew@example.com',
        password: 'securepassword',
        address: '123 Main St, Springfield, USA',
    }
  });
  // Create a parcel
  const parcel = await prisma.parcel.create({
    data: {
      item_name: 'Laptop',
      category: ParcelCategory?.MEDIUM || 'MEDIUM',
      quantity: 1,
      weight: 2.5,
      width: 30,
      length: 40,
      height: 10,
      user_id: user.id,
    }
  });

  const order = await prisma.order.create({
    data: {
        receiver_name: 'Daisy Johnson',
        pickup_address: '123 Pickup St',
        dropoff_address: '456 Dropoff St',
        pickup_lat: 12.3456,
        pickup_lon: -76.5432,
        dropoff_lat: 12.7890,
        dropoff_lon: -76.7890,
        total: 100.0,
        distance: 10.5,
        status: OrderStatus?.PICKED_UP || 'PICKED_UP',
        user_id: user.id,
        parcel_id: parcel.id,
    }
  });

  // Create a driver
  const driver = await prisma.driver.create({
    data: {
      first_name: 'Kendrick',
      last_name: 'lamar',
      vehicle_type: VehicleType?.CAR || 'CAR',
    }
  });

  const payment = await prisma.payment.create({
    data: {
      invoice_no: 1345,
      total: 100.0,
      payment_method: 'Credit Card',
      status: PaymentStatus.COMPLETED,
      order_id: order.id,
    }
  });

  // Create a review for the driver
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excellent service!',
      user_id: user.id,
      driver_id: driver.id,
      order_id: order.id,
    }
  });
  
  console.log('Sample data seeded successfully!')
};


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

