// const express = require('express');
// const paymentController = require('../controllers/paymentController');
// const router = express.Router();

// router.post('/', paymentController.createPayment);
// router.get('/order/:order', paymentController.getPaymentByOrderID);
// router.get('/', paymentController.getAllPayments);
// router.put('/:id', paymentController.updatePayment);
// router.delete('/', paymentController.deletePayment);

// module.exports = router;


const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware'); // Assumed middleware
const router = express.Router();

// Public routes
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

// Protected routes
router.post('/', authMiddleware, paymentController.createPayment);
router.get('/order/:orderId', authMiddleware, paymentController.getPaymentByOrderID);
router.get('/:id', authMiddleware, paymentController.getPaymentByID);
router.get('/', authMiddleware, paymentController.getPayments);
router.post('/:id/refund', authMiddleware, paymentController.refundPayment);

// Remove these dangerous routes or restrict to admin only
// router.put('/:id', adminMiddleware, paymentController.updatePayment);
// router.delete('/:id', adminMiddleware, paymentController.deletePayment);

module.exports = router;