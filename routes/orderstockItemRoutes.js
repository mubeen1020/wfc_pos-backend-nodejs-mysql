const express = require('express');
const orderItemRouter = express.Router();
const orderItemController = require('../controllers/orderstockItemController');

orderItemRouter.post('/order-items', orderItemController.createOrderItem);
orderItemRouter.get('/order-items/:id', orderItemController.getOrderItemById);
orderItemRouter.get('/order-items', orderItemController.getAllOrderItems);
orderItemRouter.put('/order-items/:id', orderItemController.updateOrderItem);
orderItemRouter.delete('/order-items/:id', orderItemController.deleteOrderItem);

module.exports = orderItemRouter;
