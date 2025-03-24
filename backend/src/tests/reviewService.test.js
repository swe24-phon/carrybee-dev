const { expect, describe, beforeAll, test, afterAll } = require('@jest/globals');
const reviewService = require('../services/reviewService')
const prisma = require('../../prismaClient');

// Don't want to actually create a payment
// So we create a mock to get an expected result.
jest.mock('../../prismaClient', () => ({
  review: {
    create:jest.fn(),
    findMany:jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
}));

// Test how mocking works
test("Create Review", async () => {
  const mockReviewData = {
    rating: 5,
    comment: "Excellent",
    user_id: 23909,
    driver_id: 3231
  };

  prisma.review.create.mockResolvedValue(mockReviewData)
  
  const res = await reviewService.createReview(mockReviewData)
  console.log(res)
} )

test("Get all Reviews", async () => {
  const mockReviewList = [
    {
      id: 1,
      rating: 4,
      comment: "Good",
      user_id: 3232,
      order_id: 5,
    },
    {
      id: 2,
      rating: 5,
      comment: "Excellent",
      user_id: 43214,
      order_id: 32,
    },
    {
      id: 3,
      rating: 3,
      comment: "Meh",
      user_id: 412334,
      order_id: 1232,
    }
  ]

  prisma.review.findMany.mockResolvedValue(mockReviewList)

  const res = await reviewService.getAllReviews()
  console.log(res)
})

test("Get review by ID", async () => {
  const mockReview = {
    id: 1,
    rating: 4,
    comment: "Good",
    user_id: 3232,
    order_id: 5,
  }

  prisma.review.findUnique.mockResolvedValue(mockReview)

  const res = await reviewService.getReviewById(1)
  console.log(res)
})

test("Get Review by User", async () => {
  const mockReview = {
    id: 1,
    rating: 4,
    comment: "Good",
    user_id: 3232,
    order_id: 5,
  }

  prisma.review.findUnique.mockResolvedValue(mockReview)
  const res = await reviewService.getReviewByUser(5)
  console.log(res)
})

test("Update review", async () => {
  const mockUpdatedReview = {
    id: 1,
    rating: 4,
    comment: "Good",
    user_id: 3232,
    order_id: 5,
  }

  const updateData = {
    rating: 4,
    comment: "Good",
    user_id: 3232,
    driver_id: 5
  };

  prisma.review.update.mockResolvedValue(mockUpdatedReview)

  // Might need to refactor the mock update
  // function.
  const res = await reviewService.updateReview(1, updateData)
  console.log(res)

})

test("Delete review", async () => {
  prisma.review.delete.mockResolvedValue('Review deleted successfully')

  const res = await reviewService.deleteReview(3)
  console.log(res)
})
