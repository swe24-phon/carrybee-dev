const reviewService = require('../services/reviewService')

// Create Review
const createReview = async (req, res) => {
    try {
      const newReview = await reviewService.createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Get Review by User
  const getReviewByUser = async (req, res) => {
    try {
      const review = await reviewService.getReviewByUser(req.params.userID);
      res.status(200).json(review);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Get all Reviews
  const getAllReviews = async (req, res) => {
    try {
      const reviews = await reviewService.getAllUsers();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //Update Review
  const updateReview = async (req, res) => {
    try {
      const updatedReview = await reviewService.updateReview(req.params.id, req.body);
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  //Delete Review
  const deleteReview = async (req, res) => {
    try {
      const deletedMessage = await reviewService.deleteReview(req.params.id);
      res.status(200).json(deletedMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
      createReview,
      getReviewByUser,
      getAllReviews,
      updateReview,
      deleteReview,
    };