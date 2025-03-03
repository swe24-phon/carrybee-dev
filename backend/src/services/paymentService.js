// //Vlad to do
// const prisma = require('../../prismaClient');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// const createPayment = async (paymentData) =>
// {
//     try{
//         // Unsure whether or not 'order' is needed here
//         const {invoice_no, total, payment_method, status, order_id} = paymentData;

//         // Need to create a product and price...
//         const product = await stripe.products.create({
//             name: 'T-Shirt'
//         })

//         const price = await stripe.prices.create({
//             product: product.id,
//             unit_amount: total,
//             currency: 'usd'
//         })

//         // Testing stripe sessions
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price: price.id,
//                     quantity: 1
//                 }
//             ],
//             mode: 'payment',
//             success_url: "http://localhost:4000/success.html",
//             cancel_url: "http://localhost:4000/cancel.html"
//         })
//         //   Step 1: Create record in DB
//         await prisma.payment.create(
//             {
//                 data: 
//                 {
//                     invoice_no,
//                     total,
//                     payment_method,
//                     status,
//                     order_id
//                 }
//             }
//         );


//         return session

//         // Step 1: Create record in DB
//         // const newPayment = await prisma.payment.create(
//         //     {
//         //         data: 
//         //         {
//         //             invoice_no,
//         //             total,
//         //             payment_method,
//         //             status,
//         //             order_id
//         //         }
//         //     }
//         // );

//         // Step 2: Create Stripe PaymentIntent
//         // const {error, confirmationToken} = await stripe.createConformationToken({
            
//         // })
//         // Step 3: Update order with stripe ID??

//         // const paymentIntent = await stripe.paymentIntents.create({
//         //     amount: total, // Amount should be in the smallest currency unit (e.g., cents)
//         //     currency: 'aus', // Currency code
//         //     payment_method: payment_method,
//         //     confirm: true, // Automatically confirm the payment
//         // });
        
//         // Potential for setting the values to integers
//         // const payment_status = 
//         // {
//         //     PENDING: "Pending",
//         //     COMPLETED: "Completed",
//         //     CANCELLED: "Cancelled"
//         // };

//         // return await stripe.sessions.create(
//         //     {
//         //         line_items: [
//         //             {
//         //                 price: "1234",
//         //                 quantity: 1,
//         //             },
//         //         ],
//         //         mode: "payment",
//         //         success_url:"http://localhost:4000/success.html",
//         //         cancel_url:"http://localhost:4000/cancel.html"
//         //     }
//         // )
        

//         // Some kind of validation checks?
//         // Maybe total or invoice no.

//         // Create the payment record
        
//         // return {message: 'Payment Record created successfully', payment: newPayment};
//     }
//     catch (error)
//     {
//         throw new Error('Failed to create payment: ' + error.message);
//     }
// };

// // In a real situation there could be tens of thousands of payments
// // so it'd be ill-advised to get ALL payments
// const getAllPayments = async () => 
// {
//     try
//     {
//         return await prisma.payment.findMany();
//     }
//     catch (error)
//     {
//         throw new Error('Failed to get all payments: ' + error.message);
//     }
// };

// // Implement a version that uses
// // uses another key to fetch a payment
// const getPaymentByID = async (id) => 
// {
//     try
//     {
//         const payment = await prisma.payment.findUnique({where: {id}});
//         if(!payment)
//         {
//             throw new error('Payment not found');
//         }
//         return payment;
//     }
//     catch(error)
//     {
//         throw new Error(error.message);
//     }
// };

// const getPaymentByOrder = async (orderID) => 
//     {
//         try
//         {
//             const payment = await prisma.payment.findUnique({where: {order_id: orderID}});
//             if(!payment)
//             {
//                 throw new error('Payment not found');
//             }
//             return payment;
//         }
//         catch(error)
//         {
//             throw new Error(error.message);
//         }
//     };

// // VERY DANGEROUS TO DO IN THE REAL WORLD
// // I'd throw in some admin role check or something for the update
// // and delete functions. Dealing with money and payments is 
// // serious business.
// const updatePayment = async (id, updateData) =>
// {
//     try
//     {
//         const {invoice_no, total, payment_method, status} = updateData;
//         const updatedPayment = await prisma.payment.update(
//             {
//                 where: {id},
//                 data: {
//                     invoice_no: invoice_no || undefined,
//                     total: total || undefined,
//                     payment_method: payment_method || undefined,
//                     status: status || status
//                 }
//             }
//         );
//         return {message: 'Payment updated successfully', payment: updatedPayment};
//     }
//     catch(error)
//     {
//         throw new Error(error.message);
//     }
// };

// // ALSO VERY DANGEROUS TO DO IN THE REAL WORLD
// const deletePayment = async (id) =>
// {
//     try
//     {
//         await prisma.payment.delete( {where: {id}});
//         return {message: 'Payment deleted successfully'};
//     }
//     catch(error)
//     {
//         throw new Error ('Failed to delete payment');
//     }
// };

// module.exports = {
//     createPayment,
//     getAllPayments,
//     getPaymentByID,
//     getPaymentByOrder,
//     updatePayment,
//     deletePayment
// }



const prisma = require('../../prismaClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a Stripe checkout session and payment record
 * @param {Object} paymentData - Payment data including order details
 * @returns {Object} - Stripe checkout session
 */
const createPayment = async (paymentData) => {
    try {
        const { invoice_no, total, payment_method, order_id } = paymentData;

        // First get the order details to include in the Stripe product
        const order = await prisma.order.findUnique({
            where: { id: order_id },
            include: {
                parcel: true,
                user: true
            }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        // Create a meaningful product name based on the order
        const productName = order.parcel 
            ? `Delivery for ${order.parcel.item_name}`
            : `Delivery service from ${order.pickup_address} to ${order.dropoff_address}`;

        // Create a product in Stripe that represents this delivery
        const product = await stripe.products.create({
            name: productName,
            description: `Order #${invoice_no} - Delivery distance: ${order.distance || 'Unknown'} km`,
            metadata: {
                order_id: order_id,
                invoice_no: invoice_no.toString()
            }
        });

        // Create a price for this product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(total * 100), // Convert to cents
            currency: 'usd'
        });

        // Create a payment record with PENDING status
        await prisma.payment.create({
            data: {
                invoice_no,
                total: Math.round(total * 100),
                payment_method,
                status: 'PENDING',
                order_id
            }
        });

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            mode: 'payment',
            client_reference_id: order_id,
            payment_method_types: ['card'],
            metadata: {
                order_id: order_id,
                invoice_no: invoice_no.toString()
            },
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel?order_id=${order_id}`
        });

        return session;
    } catch (error) {
        throw new Error('Failed to create payment: ' + error.message);
    }
};

/**
 * Handle Stripe webhook events
 * @param {Object} event - Stripe webhook event
 */
const handleStripeWebhook = async (event) => {
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                const orderId = session.metadata.order_id;
                const invoiceNo = parseInt(session.metadata.invoice_no);

                // Update payment status to COMPLETED
                await prisma.payment.update({
                    where: {
                        invoice_no: invoiceNo
                    },
                    data: {
                        status: 'COMPLETED'
                    }
                });

                break;

            case 'checkout.session.expired':
                const expiredSession = event.data.object;
                const expiredOrderId = expiredSession.metadata.order_id;
                const expiredInvoiceNo = parseInt(expiredSession.metadata.invoice_no);

                // Update payment status to CANCELLED
                await prisma.payment.update({
                    where: {
                        invoice_no: expiredInvoiceNo
                    },
                    data: {
                        status: 'CANCELLED'
                    }
                });

                break;
        }
    } catch (error) {
        throw new Error('Failed to handle Stripe webhook: ' + error.message);
    }
};

/**
 * Gets a limited number of payments with pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Array} - Paginated list of payments
 */
const getPayments = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        
        const [payments, total] = await Promise.all([
            prisma.payment.findMany({
                skip,
                take: limit,
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    order: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    first_name: true,
                                    last_name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            }),
            prisma.payment.count()
        ]);

        return {
            payments,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        throw new Error('Failed to get payments: ' + error.message);
    }
};

/**
 * Get payment by ID
 * @param {string} id - Payment ID
 * @returns {Object} - Payment details
 */
const getPaymentByID = async (id) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { id },
            include: {
                order: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                first_name: true,
                                last_name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
        
        if (!payment) {
            throw new Error('Payment not found');
        }
        
        return payment;
    } catch (error) {
        throw new Error('Failed to get payment: ' + error.message);
    }
};

/**
 * Get payment by order ID
 * @param {string} orderId - Order ID
 * @returns {Object} - Payment details
 */
const getPaymentByOrder = async (orderId) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { order_id: orderId },
            include: {
                order: true
            }
        });
        
        if (!payment) {
            throw new Error('Payment not found for this order');
        }
        
        return payment;
    } catch (error) {
        throw new Error('Failed to get payment for order: ' + error.message);
    }
};

/**
 * Refund a payment
 * @param {string} paymentId - Payment ID
 * @returns {Object} - Updated payment
 */
const refundPayment = async (paymentId) => {
    try {
        // First, get the payment details
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId }
        });
        
        if (!payment) {
            throw new Error('Payment not found');
        }
        
        if (payment.status !== 'COMPLETED') {
            throw new Error('Only completed payments can be refunded');
        }

        // In a real implementation, you would retrieve the Stripe payment intent
        // or charge ID associated with this payment and refund through Stripe

        // Update payment status
        const updatedPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'CANCELLED' }
        });
        
        return updatedPayment;
    } catch (error) {
        throw new Error('Failed to refund payment: ' + error.message);
    }
};

module.exports = {
    createPayment,
    handleStripeWebhook,
    getPayments,
    getPaymentByID,
    getPaymentByOrder,
    refundPayment
};