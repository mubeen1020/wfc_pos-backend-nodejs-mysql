const express = require('express');
const orderPurchaseItemController = require('../controllers/orderPurchaseItemController');
const orderpurchaserouter = express.Router();


orderpurchaserouter.post('/order-purchase-item', orderPurchaseItemController.orderPurchaseItemcreate);
orderpurchaserouter.get('/order-purchase-item', orderPurchaseItemController.orderPurchaseItemgetAll);
orderpurchaserouter.get('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemgetById);
orderpurchaserouter.put('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemupdate);
orderpurchaserouter.delete('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemdelete);

module.exports = orderpurchaserouter;
