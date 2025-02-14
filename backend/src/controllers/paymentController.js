const paymentService = require('../services/paymentService')

const createPayment = async (req, res) => 
{
    try 
    {
        const newPayment = await paymentService.createPayment(req.body);
        res.status(201).json(newPayment);
    }
    catch (error)
    {
        res.status(400).json({error: error.message});
    }
};

const getPaymentByID = async (req, res) => 
    {
        try
        {
            const payment = await paymentService.getPaymentByID(req.params.id);
            res.status(200).json(payment);
        }
        catch (error)
        {
            res.status(404).json({error: error.message})
        }
    };

// Gets a payment via an order ID
// UNTESTED
const getPaymentByOrderID = async (req, res) => 
{
    try
    {
        const payment = await paymentService.getPaymentByOrder(req.params.order);
        res.status(200).json(payment);
    }
    catch (error)
    {
        res.status(404).json({error: error.message})
    }
};

// Again, a bit much if this was the real deal but ok
const getAllPayments = async (req, res) => 
{
    try
    {
        const payments = await paymentService.getAllPayments();
        res.status(200).json(payments);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};

// Two very dangerous functions for payments
const updatePayment = async (req, res) => 
{
    try
    {
        const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
        res.status(200).json(updatedPayment);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

const deletePayment = async (req, res) => 
{
    try
    {
        const deletedMessage = await paymentService.deletePayment(req.params.id);
        res.status(200).json(deletedMessage);
    }
    catch (error)
    {
        res.status(400).json({ error: error.message });
    }
};

module.expors = {
    createPayment,
    getPaymentByID,
    getPaymentByOrderID,
    getAllPayments,
    updatePayment,
    deletePayment
};