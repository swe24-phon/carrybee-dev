const { expect, describe, beforeAll, test, afterAll } = require('@jest/globals');
const parcelService = require('../services/parcelService')
const prisma = require('../../prismaClient');

// Don't want to actually create a payment
// So we create a mock to get an expected result.
jest.mock('../../prismaClient', () => ({
  parcel: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
}));

// Test how mocking works
test("Create Parcel", async () => {
  const mockParcelData = {
    item_name: "Box",
    category: "SMALL",
    quantity: 1,
    weight: 12,
    description: "A box",
    user_id: 324,
    height: 3,
    width: 3,
    length: 3,
  };

  prisma.parcel.create.mockResolvedValue(mockParcelData)
  
  const res = await parcelService.createParcel(mockParcelData)
  console.log(res)
} )

test("Get all Parcels", async () => {
  const mockParcelList = [
    {
      id: 32,
      item_name: "Box",
      category: "SMALL",
      quantity: 1,
      weight: 12,
      description: "A box",
      user_id: 324,
      height: 3,
      width: 3,
      length: 3,
    },
    {
      id: 121,
      item_name: "Ball",
      category: "SMALL",
      quantity: 1,
      weight: 3,
      description: "A ball",
      user_id: 8,
      height: 3,
      width: 3,
      length: 3,
    },
    {
      id: 445,
      item_name: "Pyramid",
      category: "SMALL",
      quantity: 1,
      weight: 12,
      description: "A pyramid",
      user_id: 32,
      height: 3,
      width: 3,
      length: 3,
    }
  ]

  prisma.parcel.findMany.mockResolvedValue(mockParcelList)

  const res = await parcelService.getAllParcels()
  console.log(res)
})

test("Get payment by ID", async () => {
  const mockParcel = {
    id: 32,
    item_name: "Box",
    category: "SMALL",
    quantity: 1,
    weight: 12,
    description: "A box",
    user_id: 324,
    height: 3,
    width: 3,
    length: 3,
  }

  prisma.parcel.findUnique.mockResolvedValue(mockParcel)

  const res = await parcelService.getParcelById(32)
  console.log(res)
})

test("Update payment", async () => {
  const mockUpdatedParcel = {
    id: 32,
    item_name: "Donut",
    category: "SMALL",
    quantity: 1,
    weight: 1,
    description: "A donut",
    user_id: 324,
    height: 3,
    width: 3,
    length: 3,
  }

  const updateData = {
    item_name: "Donut",
    category: "SMALL",
    quantity: 1,
    weight: 1,
    width: 1,
    lenght: 1,
    height: 1,
    description: "A donut"
  };

  prisma.parcel.update.mockResolvedValue(mockUpdatedParcel)

  // Might need to refactor the mock update
  // function.
  const res = await parcelService.updateParcel(123, updateData)
  console.log(res)

})

test("Delete parcel", async () => {
  prisma.parcel.delete.mockResolvedValue('Parcel deleted successfully')

  const res = await parcelService.deleteParcel(3)
  console.log(res)
})
