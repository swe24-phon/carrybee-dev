const { calculateDistance, calculatePrice, createOrder } = require('../services/orderService');
const prisma = require('../../prismaClient');
const { createParcel } = require('../services/parcelService');
const { expect } = require('@jest/globals');

jest.mock('../services/parcelService.js', () => ({
  createParcel: jest.fn(),
}));

jest.mock('../../prismaClient', () => ({
  order: {
    create: jest.fn(),
  },
}));

describe("Order Service", () => {

  test("calculateDistance should return correct distance", () => {
    const pickup_lat = 22.3193; // Hong Kong
    const pickup_lon = 114.1694; // Hong Kong
    const dropoff_lat = 22.3964; // New Territories, HK
    const dropoff_lon = 114.1095; // New Territories, HK
    
    const distance = calculateDistance(pickup_lat, pickup_lon, dropoff_lat, dropoff_lon);
    expect(distance).toBeGreaterThan(0);
  });

  test("calculatePrice should return correct price", () => {
    const vehicleType = "MOTORBIKE";
    const distance = 10; // km
    const weight = 5; // kg

    const price = calculatePrice(vehicleType, distance, weight);
    expect(parseFloat(price)).toBeCloseTo(14.18, 1); //
  });

  test("createOrder should create an order", async () => {
    const mockOrderData = {
      user_id: 1,
      receiver_name: "John Doe",
      pickup_address: "123 Main St",
      dropoff_address: "456 Elm St",
      pickup_lat: 22.3193,
      pickup_lon: 114.1694,
      dropoff_lat: 22.3964,
      dropoff_lon: 114.1095,
      pickup_date: "2025-02-15",
      vehicleType: "MOTORBIKE",
      parcelData: { weight: 2 },
    };

    createParcel.mockResolvedValue({ parcel : { id: 1} });
    prisma.order.create.mockResolvedValue({ id: 123, ...mockOrderData });

    const result = await createOrder(mockOrderData);
    expect(result).toHaveProperty("message", "Order created successfully");
    expect(result.order).toHaveProperty("id", 123);
  });
});