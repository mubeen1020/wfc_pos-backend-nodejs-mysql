const express = require('express');
const orderPurchaseItemController = require('../controllers/orderPurchaseItemController');
const orderpurchaserouter = express.Router();


orderpurchaserouter.post('/order-purchase-item', orderPurchaseItemController.orderPurchaseItemcreate);
orderpurchaserouter.get('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemgetById);
orderpurchaserouter.get('/order-purchase-item/search', orderPurchaseItemController.searchByFishLocalNameOrFishCut);
orderpurchaserouter.get('/order-purchase-item', orderPurchaseItemController.orderPurchaseItemgetAll);
orderpurchaserouter.put('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemupdate);
orderpurchaserouter.delete('/order-purchase-item/:id', orderPurchaseItemController.orderPurchaseItemdelete);
orderpurchaserouter.get('/fishrefandfishcut', orderPurchaseItemController.getSameFishRefAndFishCut);

module.exports = orderpurchaserouter;
