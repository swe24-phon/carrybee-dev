// const paymentService = require('../services/paymentService')

// const createPayment = async (req, res) => 
// {
//     try 
//     {
//         const newPayment = await paymentService.createPayment(req.body);
//         res.status(201).json(newPayment);
//     }
//     catch (error)
//     {
//         res.status(400).json({error: error.message});
//     }
// };

// const getPaymentByID = async (req, res) => 
//     {
//         try
//         {
//             const payment = await paymentService.getPaymentByID(req.params.id);
//             res.status(200).json(payment);
//         }
//         catch (error)
//         {
//             res.status(404).json({error: error.message})
//         }
//     };

// // Gets a payment via an order ID
// // UNTESTED
// const getPaymentByOrderID = async (req, res) => 
// {
//     try
//     {
//         const payment = await paymentService.getPaymentByOrder(req.params.order);
//         res.status(200).json(payment);
//     }
//     catch (error)
//     {
//         res.status(404).json({error: error.message})
//     }
// };

// // Again, a bit much if this was the real deal but ok
// const getAllPayments = async (req, res) => 
// {
//     try
//     {
//         const payments = await paymentService.getAllPayments();
//         res.status(200).json(payments);
//     }
//     catch (error)
//     {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Two very dangerous functions for payments
// const updatePayment = async (req, res) => 
// {
//     try
//     {
//         const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
//         res.status(200).json(updatedPayment);
//     }
//     catch (error)
//     {
//         res.status(400).json({ error: error.message });
//     }
// };

// const deletePayment = async (req, res) => 
// {
//     try
//     {
//         const deletedMessage = await paymentService.deletePayment(req.params.id);
//         res.status(200).json(deletedMessage);
//     }
//     catch (error)
//     {
//         res.status(400).json({ error: error.message });
//     }
// };

// module.exports = {
//     createPayment,
//     getPaymentByID,
//     getPaymentByOrderID,
//     getAllPayments,
//     updatePayment,
//     deletePayment,
// };


const paymentService = require('../services/paymentService');

/**
 * Create a new payment and Stripe checkout session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPayment = async (req, res) => {
    try {
        const session = await paymentService.createPayment(req.body);
        res.status(201).json({
            success: true,
            message: 'Payment initiated successfully',
            sessionId: session.id,
            sessionUrl: session.url
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get payment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaymentByID = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentByID(req.params.id);
        res.status(200).json({
            success: true,
            payment
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get payment by order ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaymentByOrderID = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentByOrder(req.params.orderId);
        res.status(200).json({
            success: true,
            payment
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get paginated list of payments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPayments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await paymentService.getPayments(page, limit);
        
        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Handle Stripe webhook events
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    try {
        // Verify webhook signature
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        
        // Process the webhook event
        await paymentService.handleStripeWebhook(event);
        
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error.message);
        res.status(400).json({
            success: false,
            error: `Webhook Error: ${error.message}`
        });
    }
};

/**
 * Refund a payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refundPayment = async (req, res) => {
    try {
        // Check for admin role here (middleware would be better)
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                error: 'Unauthorized: Admin access required'
            });
        }
        
        const updatedPayment = await paymentService.refundPayment(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Payment refunded successfully',
            payment: updatedPayment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createPayment,
    getPaymentByID,
    getPaymentByOrderID,
    getPayments,
    handleWebhook,
    refundPayment
};