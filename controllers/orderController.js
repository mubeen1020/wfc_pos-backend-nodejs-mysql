const Order = require('../models/orderModel');

exports.createOrder = (req, res) => {
  const newOrderData = req.body;

  Order.create(newOrderData, (error, newOrder) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the order.',
        error,
      });
    }
    res.json({
      message: 'Order created successfully!',
      newOrder,
    });
  });
};

exports.getAllOrders = (req, res) => {
  Order.getAll((error, orders) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving orders.',
        error,
      });
    }
    res.json({
      message: 'Retrieved orders successfully!',
      orders,
    });
  });
};

exports.getOrderById = (req, res) => {
  const { id } = req.params;

  Order.getById(id, (error, order) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the order.',
        error,
      });
    }
    if (!order) {
      return res.status(404).json({
        message: 'Order not found.',
      });
    }
    res.json({
      message: 'Found order by ID!',
      order,
    });
  });
};

exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const updatedOrderData = req.body;

  Order.update(id, updatedOrderData, (error, updatedOrder) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the order.',
        error,
      });
    }
    res.json({
      message: 'Order updated successfully!',
      updatedOrder,
    });
  });
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;

  Order.delete(id, (error, deletedOrder) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the order.',
        error,
      });
    }
    res.json({
      message: 'Order deleted successfully!',
      deletedOrder,
    });
  });
};
