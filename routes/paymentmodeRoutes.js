const express = require('express');
const paymentmodeRouter = express.Router();
const paymentmodeController = require('../controllers/paymentmodeController');

paymentmodeRouter.post('/payment-mode', paymentmodeController.createpaymentmode);
paymentmodeRouter.get('/payment-mode/:id', paymentmodeController.getpaymentmodeById);
paymentmodeRouter.get('/payment-mode', paymentmodeController.getAllpaymentmodes);
paymentmodeRouter.put('/payment-mode/:id', paymentmodeController.updatepaymentmodeById);
paymentmodeRouter.delete('/payment-mode/:id', paymentmodeController.deletepaymentmodeById);

module.exports = paymentmodeRouter;
