const { PrismaClient, ParcelCategory, OrderStatus, VehicleType, PaymentStatus } = require('@prisma/client');
const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');

async function main() {
  // Clear existing data

  // Create users
  const password = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      password,
      address: '123 Main St, City'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
      password,
      address: '456 Oak Ave, Town'
    }
  });

  // Create parcels
  const parcel1 = await prisma.parcel.create({
    data: {
      item_name: 'Documents',
      category: 'SMALL',
      quantity: 1,
      weight: 0.5,
      width: 30,
      length: 21,
      height: 1,
      description: 'Important documents',
      user_id: user1.id
    }
  });

  const parcel2 = await prisma.parcel.create({
    data: {
      item_name: 'Laptop',
      category: 'MEDIUM',
      quantity: 1,
      weight: 2.5,
      width: 35,
      length: 25,
      height: 5,
      description: 'MacBook Pro in original packaging',
      user_id: user1.id
    }
  });

  const parcel3 = await prisma.parcel.create({
    data: {
      item_name: 'Office Supplies',
      category: 'LARGE',
      quantity: 5,
      weight: 8.0,
      width: 50,
      length: 40,
      height: 30,
      description: 'Box of various office supplies',
      user_id: user2.id
    }
  });

  // Create orders for first user with different statuses
  // Order 1 - Delivered last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  const order1 = await prisma.order.create({
    data: {
      receiver_name: 'Alice Johnson',
      pickup_address: '123 Main St, City',
      dropoff_address: '789 Pine St, Downtown',
      pickup_lat: 37.7749,
      pickup_lon: -122.4194,
      dropoff_lat: 37.7833,
      dropoff_lon: -122.4167,
      pickup_date: lastMonth,
      distance: 3.2,
      total: 15.50,
      vehicleType: 'MOTORBIKE',
      status: 'DELIVERED',
      user_id: user1.id,
      parcel_id: parcel1.id
    }
  });

  // Order 2 - Delivered this month
  const thisMonth = new Date();
  thisMonth.setDate(thisMonth.getDate() - 15);
  
  const order2 = await prisma.order.create({
    data: {
      receiver_name: 'Bob Miller',
      pickup_address: '123 Main St, City',
      dropoff_address: '101 Business Ave, Financial District',
      pickup_lat: 37.7749,
      pickup_lon: -122.4194,
      dropoff_lat: 37.7937,
      dropoff_lon: -122.3965,
      pickup_date: thisMonth,
      distance: 5.7,
      total: 22.80,
      vehicleType: 'CAR',
      status: 'DELIVERED',
      user_id: user1.id,
      parcel_id: parcel2.id
    }
  });

  // Order 3 - In transit (current)
  const today = new Date();
  
  const order3 = await prisma.order.create({
    data: {
      receiver_name: 'Carol Taylor',
      pickup_address: '123 Main St, City',
      dropoff_address: '555 College Blvd, University Area',
      pickup_lat: 37.7749,
      pickup_lon: -122.4194,
      dropoff_lat: 37.7268,
      dropoff_lon: -122.4807,
      pickup_date: today,
      distance: 8.3,
      total: 35.75,
      vehicleType: 'VAN',
      status: 'IN_TRANSIT',
      user_id: user1.id,
      parcel_id: parcel1.id
    }
  });

  // Create payments
  const payment1 = await prisma.payment.create({
    data: {
      invoice_no: 10001,
      total: 15.50,
      payment_method: 'CREDIT_CARD',
      status: 'COMPLETED',
      order_id: order1.id
    }
  });

  const payment2 = await prisma.payment.create({
    data: {
      invoice_no: 10002,
      total: 22.80,
      payment_method: 'PAYPAL',
      status: 'COMPLETED',
      order_id: order2.id
    }
  });

  const payment3 = await prisma.payment.create({
    data: {
      invoice_no: 10003,
      total: 35.75,
      payment_method: 'CREDIT_CARD',
      status: 'PENDING',
      order_id: order3.id
    }
  });

  // Create reviews
  const review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excellent service, delivered on time!',
      user_id: user1.id,
      order_id: order1.id
    }
  });

  const review2 = await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Good service but the package was slightly damaged.',
      user_id: user1.id,
      order_id: order2.id
    }
  });

  // Add more seed data for the second user
  const userOrder1 = await prisma.order.create({
    data: {
      receiver_name: 'David Wilson',
      pickup_address: '456 Oak Ave, Town',
      dropoff_address: '222 Market St, Shopping District',
      pickup_lat: 37.7831,
      pickup_lon: -122.4181,
      dropoff_lat: 37.7939,
      dropoff_lon: -122.3989,
      pickup_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      distance: 4.1,
      total: 18.90,
      vehicleType: 'CAR',
      status: 'DELIVERED',
      user_id: user2.id,
      parcel_id: parcel3.id
    }
  });

  await prisma.payment.create({
    data: {
      invoice_no: 10004,
      total: 18.90,
      payment_method: 'CREDIT_CARD',
      status: 'COMPLETED',
      order_id: userOrder1.id
    }
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Very professional delivery driver!',
      user_id: user2.id,
      order_id: userOrder1.id
    }
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });