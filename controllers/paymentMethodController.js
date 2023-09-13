const PaymentMethod = require('../models/paymentMethodModel');

exports.createPaymentMethod = (req, res) => {
  const { name } = req.body;

  const newPaymentMethod = new PaymentMethod({
    name,
  });

  PaymentMethod.create(newPaymentMethod, (error, paymentMethod) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new payment method.',
        error,
      });
    }
    res.json({
      message: 'Payment method created successfully!',
      paymentMethod,
    });
  });
};

exports.getAllPaymentMethods = (req, res) => {
  PaymentMethod.getAll((error, paymentMethods) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving payment methods.',
        error,
      });
    }
    res.json({
      message: 'Retrieved payment methods successfully!',
      paymentMethods,
    });
  });
};

exports.getPaymentMethodById = (req, res) => {
  const { id } = req.params;

  PaymentMethod.getById(id, (error, paymentMethod) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the payment method.',
        error,
      });
    }
    if (!paymentMethod) {
      return res.status(404).json({
        message: 'Payment method not found.',
      });
    }
    res.json({
      message: 'Found payment method by ID!',
      paymentMethod,
    });
  });
};

exports.updatePaymentMethodById = (req, res) => {
  const { id } = req.params;
  const updatedPaymentMethod = req.body;

  PaymentMethod.updateById(id, updatedPaymentMethod, (error, paymentMethod) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the payment method.',
        error,
      });
    }
    if (!paymentMethod) {
      return res.status(404).json({
        message: 'Payment method not found.',
      });
    }
    res.json({
      message: 'Payment method updated successfully!',
      paymentMethod,
    });
  });
};

exports.deletePaymentMethodById = (req, res) => {
  const { id } = req.params;

  PaymentMethod.deleteById(id, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the payment method.',
        error,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Payment method not found.',
      });
    }
    res.json({
      message: 'Payment method deleted successfully!',
      result,
    });
  });
};
