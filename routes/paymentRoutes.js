const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');

paymentRouter.post('/payments', paymentController.createPayment);
paymentRouter.get('/payments', paymentController.getAllPayments);
paymentRouter.get('/payments/:id', paymentController.getPaymentById);
paymentRouter.put('/payments/:id', paymentController.updatePayment);
paymentRouter.delete('/payments/:id', paymentController.deletePayment);

module.exports = paymentRouter;
