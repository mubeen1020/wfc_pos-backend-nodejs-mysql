const PaymentStatus = require('../models/paymentStatusModel');

exports.createPaymentStatus = (req, res) => {
  const newPaymentStatusData = req.body;

  PaymentStatus.create(newPaymentStatusData, (error, newPaymentStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the payment status.',
        error,
      });
    }
    res.json({
      message: 'Payment status created successfully!',
      newPaymentStatus,
    });
  });
};

exports.getAllPaymentStatuses = (req, res) => {
  PaymentStatus.getAll((error, paymentStatuses) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving payment statuses.',
        error,
      });
    }
    res.json({
      message: 'Retrieved payment statuses successfully!',
      paymentStatuses,
    });
  });
};

exports.getPaymentStatusById = (req, res) => {
  const { id } = req.params;

  PaymentStatus.getById(id, (error, paymentStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the payment status.',
        error,
      });
    }
    if (!paymentStatus) {
      return res.status(404).json({
        message: 'Payment status not found.',
      });
    }
    res.json({
      message: 'Found payment status by ID!',
      paymentStatus,
    });
  });
};

exports.updatePaymentStatus = (req, res) => {
  const { id } = req.params;
  const updatedPaymentStatusData = req.body;

  PaymentStatus.update(id, updatedPaymentStatusData, (error, updatedPaymentStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the payment status.',
        error,
      });
    }
    res.json({
      message: 'Payment status updated successfully!',
      updatedPaymentStatus,
    });
  });
};

exports.deletePaymentStatus = (req, res) => {
  const { id } = req.params;

  PaymentStatus.delete(id, (error, deletedPaymentStatus) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the payment status.',
        error,
      });
    }
    res.json({
      message: 'Payment status deleted successfully!',
      deletedPaymentStatus,
    });
  });
};
