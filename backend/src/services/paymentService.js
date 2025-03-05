//Vlad to do
const prisma = require('../../prismaClient');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPayment = async (paymentData) =>
{
    try{
        // Unsure whether or not 'order' is needed here
        const {invoice_no, total, payment_method, status, order_id} = paymentData;

        // Need to create a product and price...
        const product = await stripe.products.create({
            name: 'T-Shirt'
        })

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: total,
            currency: 'usd'
        })

        // Testing stripe sessions
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: "http://localhost:4000/success.html",
            cancel_url: "http://localhost:4000/cancel.html"
        })
        //   Step 1: Create record in DB
        await prisma.payment.create(
            {
                data: 
                {
                    invoice_no,
                    total,
                    payment_method,
                    status,
                    order_id
                }
            }
        );


        return session

        // Step 1: Create record in DB
        // const newPayment = await prisma.payment.create(
        //     {
        //         data: 
        //         {
        //             invoice_no,
        //             total,
        //             payment_method,
        //             status,
        //             order_id
        //         }
        //     }
        // );

        // Step 2: Create Stripe PaymentIntent
        // const {error, confirmationToken} = await stripe.createConformationToken({
            
        // })
        // Step 3: Update order with stripe ID??

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: total, // Amount should be in the smallest currency unit (e.g., cents)
        //     currency: 'aus', // Currency code
        //     payment_method: payment_method,
        //     confirm: true, // Automatically confirm the payment
        // });
        
        // Potential for setting the values to integers
        // const payment_status = 
        // {
        //     PENDING: "Pending",
        //     COMPLETED: "Completed",
        //     CANCELLED: "Cancelled"
        // };

        // return await stripe.sessions.create(
        //     {
        //         line_items: [
        //             {
        //                 price: "1234",
        //                 quantity: 1,
        //             },
        //         ],
        //         mode: "payment",
        //         success_url:"http://localhost:4000/success.html",
        //         cancel_url:"http://localhost:4000/cancel.html"
        //     }
        // )
        

        // Some kind of validation checks?
        // Maybe total or invoice no.

        // Create the payment record
        
        // return {message: 'Payment Record created successfully', payment: newPayment};
    }
    catch (error)
    {
        throw new Error('Failed to create payment: ' + error.message);
    }
};

// In a real situation there could be tens of thousands of payments
// so it'd be ill-advised to get ALL payments
const getAllPayments = async () => 
{
    try
    {
        return await prisma.payment.findMany();
    }
    catch (error)
    {
        throw new Error('Failed to get all payments: ' + error.message);
    }
};

// Implement a version that uses
// uses another key to fetch a payment
const getPaymentByID = async (id) => 
{
    try
    {
        const payment = await prisma.payment.findUnique({where: {id}});
        if(!payment)
        {
            throw new error('Payment not found');
        }
        return payment;
    }
    catch(error)
    {
        throw new Error(error.message);
    }
};

const getPaymentByOrder = async (orderID) => 
    {
        try
        {
            const payment = await prisma.payment.findUnique({where: {order_id: orderID}});
            if(!payment)
            {
                throw new error('Payment not found');
            }
            return payment;
        }
        catch(error)
        {
            throw new Error(error.message);
        }
    };

// VERY DANGEROUS TO DO IN THE REAL WORLD
// I'd throw in some admin role check or something for the update
// and delete functions. Dealing with money and payments is 
// serious business.
const updatePayment = async (id, updateData) =>
{
    try
    {
        const {invoice_no, total, payment_method, status} = updateData;
        const updatedPayment = await prisma.payment.update(
            {
                where: {id},
                data: {
                    invoice_no: invoice_no || undefined,
                    total: total || undefined,
                    payment_method: payment_method || undefined,
                    status: status || status
                }
            }
        );
        return {message: 'Payment updated successfully', payment: updatedPayment};
    }
    catch(error)
    {
        throw new Error(error.message);
    }
};

// ALSO VERY DANGEROUS TO DO IN THE REAL WORLD
const deletePayment = async (id) =>
{
    try
    {
        await prisma.payment.delete( {where: {id}});
        return {message: 'Payment deleted successfully'};
    }
    catch(error)
    {
        throw new Error ('Failed to delete payment');
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentByID,
    getPaymentByOrder,
    updatePayment,
    deletePayment
}