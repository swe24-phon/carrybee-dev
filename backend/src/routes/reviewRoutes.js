const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', reviewController.createReview);
router.get('/reviews/:user', reviewController.getReviewByUser);
router.get('/reviews', reviewController.getAllReviews);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews', reviewController.deleteReview);
