const { expect, describe, beforeAll, test, afterAll } = require('@jest/globals');
const orderService = require('../services/orderService')
const prisma = require('../../prismaClient');

// Don't want to actually create a payment
// So we create a mock to get an expected result.
jest.mock('../../prismaClient', () => ({
  order: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
    user: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
}));

// Test how mocking works
test("Create order", async () => {
  const mockOrderData = {
    user_id: 1231231288,
    receiver_name: "Bob",
    pickup_address: "321 ave",
    dropoff_address: "098 street",
    pickup_date: 9999,
    distance: 123,
    vehicleType: "CAR",
    total: 5423,
    parcel_id : 1
  };

  prisma.user.findUnique.mockResolvedValue({name:"Han"})
  prisma.order.create.mockResolvedValue({id: 23132232, ...mockOrderData})
  
  const res = await orderService.createOrder(mockOrderData)
  console.log(res)
} )

test("Get all Orders", async () => {
  const mockOrderList = [
    {
      user_id: 1231231288,
      receiver_name: "Bob",
      pickup_address: "456 ave",
      dropoff_address: "74 street",
      pickup_date: 9999,
      distance: 1415,
      vehicleType: "CAR",
      total: 5423,
      parcel_id : 4
    },
    {
      user_id: 95356,
      receiver_name: "Cob",
      pickup_address: "6345 ave",
      dropoff_address: "45 street",
      pickup_date: 9999,
      distance: 412,
      vehicleType: "MOTORBIKE",
      total: 567,
      parcel_id : 3
    },
    {
      user_id: 34151467534,
      receiver_name: "Lob",
      pickup_address: "745 ave",
      dropoff_address: "634 street",
      pickup_date: 9999,
      distance: 645,
      vehicleType: "VAN",
      total: 4342,
      parcel_id : 6
    }
  ]

  prisma.order.findMany.mockResolvedValue(mockOrderList)

  const res = await orderService.getAllOrders()
  console.log(res)
})

test("Get order by ID", async () => {
  const mockOrder = {
    id: 123,
    user_id: 1231231288,
    receiver_name: "Bob",
    pickup_address: "321 ave",
    dropoff_address: "098 street",
    pickup_date: 9999,
    distance: 123,
    vehicleType: "CAR",
    total: 5423,
    parcel_id : 1,
    review_id : 2
  }

  prisma.order.findUnique.mockResolvedValue(mockOrder)

  const res = await orderService.getOrderById(123)
  console.log(res)
})

test("Update order", async () => {
  const mockUpdatedOrder = {
    id: 123,
    user_id: 1231231288,
    receiver_name: "Bob",
    pickup_address: "321 ave",
    dropoff_address: "098 street",
    pickup_date: 9999,
    distance: 123,
    vehicleType: "CAR",
    total: 5423,
    parcel_id : 1,
    review_id : 2
  }

  const updateData = {
    receiver_name: "Bob",
    pickup_address: "321 ave",
    dropoff_address: "098 street",
    pickup_date: 9999,
  };

  prisma.order.update.mockResolvedValue(mockUpdatedOrder)

  // Might need to refactor the mock update
  // function.
  const res = await orderService.updateOrder(123, updateData)
  console.log(res)

})

test("Delete order", async () => {
  prisma.order.update.mockResolvedValue('Order deleted successfully')

  const res = await orderService.deleteOrder(4)
  console.log(res)
})
