const express = require('express');
const rateListController = require('../controllers/rateListController');

const ratesrouter = express.Router();

ratesrouter.post('/rates', rateListController.createRate);
ratesrouter.get('/rates', rateListController.getAllRates);
ratesrouter.get('/rates/:id', rateListController.getratesById);
ratesrouter.put('/rates/:id', rateListController.updateRate);
ratesrouter.delete('/rates/:id', rateListController.deleteRate);

module.exports = ratesrouter;
