const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/', paymentController.createPayment);
router.get('/order/:order', paymentController.getPaymentByOrderID);
router.get('/', paymentController.getAllPayments);
router.put('/:id', paymentController.updatePayment);
router.delete('/', paymentController.deletePayment);

module.exports = router;