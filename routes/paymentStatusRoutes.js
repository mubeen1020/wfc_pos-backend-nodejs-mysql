const express = require('express');
const paymentStatusrouter = express.Router();
const paymentStatusController = require('../controllers/paymentStatusController');

paymentStatusrouter.post('/paymentStatus', paymentStatusController.createPaymentStatus);
paymentStatusrouter.get('/paymentStatus', paymentStatusController.getAllPaymentStatuses);
paymentStatusrouter.get('/paymentStatus/:id', paymentStatusController.getPaymentStatusById);
paymentStatusrouter.put('/paymentStatus/:id', paymentStatusController.updatePaymentStatus);
paymentStatusrouter.delete('/paymentStatus/:id', paymentStatusController.deletePaymentStatus);

module.exports = paymentStatusrouter;
