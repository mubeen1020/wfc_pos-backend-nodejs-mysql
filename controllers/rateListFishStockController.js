const RateListFishStock = require('../models/rateListFishStockModel');

exports.createRate = (req, res) => {
  const newRate = new RateListFishStock(req.body);

  RateListFishStock.create(newRate, (error, rate) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new rate.',
        error,
      });
    }
    res.json({
      message: 'Rate created successfully!',
      rate,
    });
  });
};

exports.getAllRates = (req, res) => {
  RateListFishStock.getAll((error, rates) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving rates.',
        error,
      });
    }
    res.json({
      message: 'Retrieved rates successfully!',
      rates,
    });
  });
};

exports.getRateById = (req, res) => {
  const { id } = req.params;

  RateListFishStock.getById(id, (error, rate) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving the rate.',
        error,
      });
    }
    if (!rate) {
      return res.status(404).json({
        message: 'Rate not found.',
      });
    }
    res.json({
      message: 'Found rate by ID!',
      rate,
    });
  });
};

exports.updateRateById = (req, res) => {
  const { id } = req.params;
  const updatedRate = req.body;

  RateListFishStock.update(id, updatedRate, (error, rate) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the rate.',
        error,
      });
    }
    if (!rate) {
      return res.status(404).json({
        message: 'Rate not found.',
      });
    }
    res.json({
      message: 'Updated rate successfully!',
      rate,
    });
  });
};

exports.deleteRateById = (req, res) => {
  const { id } = req.params;

  RateListFishStock.delete(id, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the rate.',
        error,
      });
    }
    if (!result) {
      return res.status(404).json({
        message: 'Rate not found.',
      });
    }
    res.json({
      message: 'Deleted rate successfully!',
      result,
    });
  });
};
