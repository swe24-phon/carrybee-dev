const { expect, describe, beforeAll, test, afterAll } = require('@jest/globals');
const paymentService = require('../services/paymentService')
const prisma = require('../../prismaClient');

// Don't want to actually create a payment
// So we create a mock to get an expected result.
jest.mock('../../prismaClient', () => ({
  payment: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
}));

// Test how mocking works
test("Create Payment", async () => {
  const mockPaymentData = {
    invoice_no: 1231231288,
    total: 1234,
    payment_method: "VISA",
    status: "COMPLETED",
    order_id: 1234123
  };

  prisma.payment.create.mockResolvedValue({id: 123, ...mockPaymentData})
  
  const res = await paymentService.createPayment(mockPaymentData)
  console.log(res)
} )

test("Get all Payments", async () => {
  const mockPaymentList = [
    {
      id: 312,
      invoice_no: 1,
      total: 1234,
      payment_method: "VISA",
      status: "COMPLETED",
      order_id: 3,
      created_at: 9999,
      updated_at: 9999
    },
    {
      id: 21378912,
      invoice_no: 2,
      total: 234,
      payment_method: "VISA",
      status: "COMPLETED",
      order_id: 6,
      created_at: 9999,
      updated_at: 9999
    },
    {
      id: 54145,
      invoice_no: 3,
      total: 321,
      payment_method: "VISA",
      status: "COMPLETED",
      order_id: 4,
      created_at: 9999,
      updated_at: 9999
    }
  ]

  prisma.payment.findMany.mockResolvedValue(mockPaymentList)

  const res = await paymentService.getAllPayments()
  console.log(res)
})

test("Get payment by ID", async () => {
  const mockPayment = {
    id: 21378912,
    invoice_no: 1,
    total: 1234,
    payment_method: "VISA",
    status: "COMPLETED",
    order_id: 3,
    created_at: 9999,
    updated_at: 9999
  }

  prisma.payment.findUnique.mockResolvedValue(mockPayment)

  const res = await paymentService.getPaymentByID(21378912)
  console.log(res)
})

test("Get Payments by Order", async () => {
  const mockPayment = {
    id: 21378912,
    invoice_no: 1,
    total: 1234,
    payment_method: "VISA",
    status: "COMPLETED",
    order_id: 3,
    created_at: 9999,
    updated_at: 9999
  }

  prisma.payment.findUnique.mockResolvedValue(mockPayment)
  const res = await paymentService.getPaymentByOrder(3)
  console.log(res)
})

test("Update payment", async () => {
  const mockUpdatedPayment = {
    id: 21378912,
    invoice_no: 1,
    total: 1234,
    payment_method: "VISA",
    status: "COMPLETED",
    order_id: 3,
    created_at: 9999,
    updated_at: 9999
  }

  const updateData = {
    invoice_no: 21378912,
    total: 1234,
    payment_method: "VISA",
    status: "COMPLETED",
    order_id: 3
  };

  prisma.payment.update.mockResolvedValue(mockUpdatedPayment)

  // Might need to refactor the mock update
  // function.
  const res = await paymentService.updatePayment(123, updateData)
  console.log(res)

})

test("Delete payment", async () => {
  prisma.payment.update.mockResolvedValue('Payment deleted successfully')

  const res = await paymentService.deletePayment(3)
  console.log(res)
})
