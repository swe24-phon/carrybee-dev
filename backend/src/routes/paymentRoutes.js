const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/payments', paymentController.createPayment);
router.get('/payments/:order', paymentController.getPaymentOrder);
router.get('/payments', paymentController.getAllPayments);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments', paymentController.deletePayment);
