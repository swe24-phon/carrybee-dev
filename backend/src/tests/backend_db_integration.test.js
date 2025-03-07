const { beforeAll, afterAll } = require('@jest/globals')
const orderService = require('../services/orderService')
const parcelService = require('../services/parcelService')
const paymentService = require('../services/paymentService')
const reviewService = require('../services/reviewService')
const userService = require('../services/userService')
const prisma = require('../../prismaClient')
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

let user1
let parcel1
let order1
let payment1
let review1

beforeAll(async () => {
    const password = await bcrypt.hash('password123', 10);
  
    user1 = await prisma.user.create({
      data: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        password,
        address: '123 Main St, City'
      }
    });

    parcel1 = await prisma.parcel.create({
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

      const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  order1 = await prisma.order.create({
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

  // Create payments
  payment1 = await prisma.payment.create({
    data: {
      invoice_no: 10001,
      total: 15.50,
      payment_method: 'CREDIT_CARD',
      status: 'COMPLETED',
      order_id: order1.id
    }
  });

  review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Excellent service, delivered on time!',
      user_id: user1.id,
      order_id: order1.id
    }
  });
})

afterAll(async () => {

})

test("Dry run", () => {
    console.log(user1)
    console.log(parcel1)
    console.log(order1)
    console.log(payment1)
    console.log(review1)
})