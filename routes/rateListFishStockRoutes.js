const express = require('express');
const ratesstockrouter = express.Router();
const rateListFishStockController = require('../controllers/rateListFishStockController');

ratesstockrouter.post('/rates-stock', rateListFishStockController.createRate);
ratesstockrouter.get('/rates-stock', rateListFishStockController.getAllRates);
ratesstockrouter.get('/rates-stock/:id', rateListFishStockController.getRateById);
ratesstockrouter.put('/rates-stock/:id', rateListFishStockController.updateRateById);
ratesstockrouter.delete('/rates-stock/:id', rateListFishStockController.deleteRateById);

module.exports = ratesstockrouter;
