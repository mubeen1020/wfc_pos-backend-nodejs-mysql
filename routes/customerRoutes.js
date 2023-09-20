const express = require('express');
const customerrouter = express.Router();
const customerController = require('../controllers/customerController');

customerrouter.post('/customer', customerController.createCustomer);
customerrouter.get('/customer', customerController.getAllCustomers);
customerrouter.get('/customer/search', customerController.searchCustomers);
customerrouter.get('/customer/:id', customerController.getCustomerById);
customerrouter.put('/customer/:id', customerController.updateCustomer);
customerrouter.delete('/customer/:id', customerController.deleteCustomer);


module.exports = customerrouter;
