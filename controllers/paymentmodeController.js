const PaymentMode = require('../models/paymentmodeModel');

exports.createpaymentmode = (req, res) => {
  const  payment_mode  = req.body;


  PaymentMode.create(payment_mode, (error, paymentmode) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new Payment Mode.',
        error,
      });
    }
    res.json({
      message: 'Payment Mode created successfully!',
      paymentmode,
    });
  });
};

exports.getpaymentmodeById = (req, res) => {
  const { id } = req.params;

  PaymentMode.getById(id, (error, paymentmode) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Payment Mode by ID.',
        error,
      });
    }
    if (!paymentmode) {
      return res.status(404).json({
        message: 'Payment Mode not found.',
      });
    }
    res.json({
      message: 'Found Payment Mode by ID!',
      paymentmode,
    });
  });
};

exports.getAllpaymentmodes = (req, res) => {
    PaymentMode.getAll((error, paymentmodes) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Payment Modes.',
        error,
      });
    }
    res.json({
      message: 'Retrieved Payment Modes successfully!',
      paymentmodes,
    });
  });
};

exports.updatepaymentmodeById = (req, res) => {
  const { id } = req.params;
  const updatedpaymentmode = req.body;

  PaymentMode.updateById(id, updatedpaymentmode, (error, paymentmode) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating Payment Mode by ID.',
        error,
      });
    }
    res.json({
      message: 'Updated Payment Mode by ID!',
      paymentmode,
    });
  });
};

exports.deletepaymentmodeById = (req, res) => {
  const { id } = req.params;

  PaymentMode.deleteById(id, (error) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting Payment Mode by ID.',
        error,
      });
    }
    res.json({
      message: 'Deleted Payment Mode by ID!',
      id
    });
  });
};
