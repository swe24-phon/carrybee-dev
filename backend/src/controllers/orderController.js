const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
};

module.exports = {
    createOrder
};