const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.sendFile(__dirname + '/../views/order-history.html');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving orders");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving order");
  }
};

exports.createOrder = async (req, res) => {
  try {
    // For a real checkout, calculate totals from cart items.
    const { totalAmount } = req.body;
    const newOrder = await Order.create({
      totalAmount: totalAmount || 0,
    });
    console.log('New order created:', newOrder.id);
    res.redirect('/order');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
};
