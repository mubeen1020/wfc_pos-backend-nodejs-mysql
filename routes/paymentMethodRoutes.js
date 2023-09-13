const express = require('express');
const paymentMethodRouter = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

paymentMethodRouter.post('/payment-methods', paymentMethodController.createPaymentMethod);
paymentMethodRouter.get('/payment-methods', paymentMethodController.getAllPaymentMethods);
paymentMethodRouter.get('/payment-methods/:id', paymentMethodController.getPaymentMethodById);
paymentMethodRouter.put('/payment-methods/:id', paymentMethodController.updatePaymentMethodById);
paymentMethodRouter.delete('/payment-methods/:id', paymentMethodController.deletePaymentMethodById);

module.exports = paymentMethodRouter;
