const OrderStatus = require('../models/orderStatusModel');

exports.createOrderStatus = (req, res) => {
  const newOrderStatusData = req.body;

  OrderStatus.create(newOrderStatusData, (error, newOrderStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the order status.',
        error,
      });
    }
    res.json({
      message: 'Order status created successfully!',
      newOrderStatus,
    });
  });
};

exports.getAllOrderStatuses = (req, res) => {
  OrderStatus.getAll((error, orderStatuses) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving order statuses.',
        error,
      });
    }
    res.json({
      message: 'Retrieved order statuses successfully!',
      orderStatuses,
    });
  });
};

exports.getOrderStatusById = (req, res) => {
  const { id } = req.params;

  OrderStatus.getById(id, (error, orderStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the order status.',
        error,
      });
    }
    if (!orderStatus) {
      return res.status(404).json({
        message: 'Order status not found.',
      });
    }
    res.json({
      message: 'Found order status by ID!',
      orderStatus,
    });
  });
};

exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const updatedOrderStatusData = req.body;

  OrderStatus.update(id, updatedOrderStatusData, (error, updatedOrderStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the order status.',
        error,
      });
    }
    res.json({
      message: 'Order status updated successfully!',
      updatedOrderStatus,
    });
  });
};

exports.deleteOrderStatus = (req, res) => {
  const { id } = req.params;

  OrderStatus.delete(id, (error, deletedOrderStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the order status.',
        error,
      });
    }
    res.json({
      message: 'Order status deleted successfully!',
      deletedOrderStatus,
    });
  });
};
