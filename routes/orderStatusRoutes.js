const express = require('express');
const orderStatusrouter = express.Router();
const orderStatusController = require('../controllers/orderStatusController');

orderStatusrouter.post('/orderStatus', orderStatusController.createOrderStatus);
orderStatusrouter.get('/orderStatus', orderStatusController.getAllOrderStatuses);
orderStatusrouter.get('/orderStatus/:id', orderStatusController.getOrderStatusById);
orderStatusrouter.put('/orderStatus/:id', orderStatusController.updateOrderStatus);
orderStatusrouter.delete('/orderStatus/:id', orderStatusController.deleteOrderStatus);

module.exports = orderStatusrouter;
