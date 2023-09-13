const express = require('express');
const ordersrouter = express.Router();
const orderController = require('../controllers/orderController');

ordersrouter.post('/orders', orderController.createOrder);
ordersrouter.get('/orders', orderController.getAllOrders);
ordersrouter.get('/orders/:id', orderController.getOrderById);
ordersrouter.put('/orders/:id', orderController.updateOrder);
ordersrouter.delete('/orders/:id', orderController.deleteOrder);

module.exports = ordersrouter;
