const Payment = require('../models/paymentModel');

exports.createPayment = (req, res) => {
  const newPayment = new Payment(req.body);

  Payment.create(newPayment, (error, payment) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new payment.',
        error,
      });
    }
    res.json({
      message: 'Payment created successfully!',
      payment,
    });
  });
};

exports.getAllPayments = (req, res) => {
  Payment.getAll((error, payments) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving payments.',
        error,
      });
    }
    res.json({
      message: 'Retrieved payments successfully!',
      payments,
    });
  });
};

exports.getPaymentById = (req, res) => {
  const { id } = req.params;

  Payment.getById(id, (error, payment) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the payment.',
        error,
      });
    }
    if (!payment) {
      return res.status(404).json({
        message: 'Payment not found.',
      });
    }
    res.json({
      message: 'Found payment by ID!',
      payment,
    });
  });
};

exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const updatedPayment = req.body;

  Payment.update(id, updatedPayment, (error, payment) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the payment.',
        error,
      });
    }
    if (!payment) {
      return res.status(404).json({
        message: 'Payment not found.',
      });
    }
    res.json({
      message: 'Payment updated successfully!',
      payment,
    });
  });
};

exports.deletePayment = (req, res) => {
  const { id } = req.params;

  Payment.delete(id, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the payment.',
        error,
      });
    }
    if (result === null) {
      return res.status(404).json({
        message: 'Payment not found.',
      });
    }
    res.json({
      message: 'Payment deleted successfully!',
      result,
    });
  });
};

exports.searchPaymentsByCustomerFullName = (req, res) => {
  const { searchTerm } = req.query;
  
  Payment.searchByCustomerFullName(searchTerm, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Error searching for payments by customer full name',
        error: err,
      });
    } else {
      res.status(200).json(data);
    }
  });
};
