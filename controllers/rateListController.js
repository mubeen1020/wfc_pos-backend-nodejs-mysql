const RateList = require('../models/rateListModel');

exports.createRate = (req, res) => {
  const newRate = new RateList(req.body);

  RateList.create(newRate, (error, rate) => {
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
  RateList.getAll((error, rates) => {
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

exports.getratesById = (req, res) => {
    const { id } = req.params;
  
    RateList.getById(id, (error, rates) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while retrieving the rates.',
          error,
        });
      }
      if (!rates) {
        return res.status(404).json({
          message: 'rates not found.',
        });
      }
      res.json({
        message: 'Found rates by ID!',
        rates,
      });
    });
  };

exports.updateRate = (req, res) => {
  const { id } = req.params;
  const updatedRate = req.body;

  RateList.update(id, updatedRate, (error, rate) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the rate.',
        error,
      });
    }
    res.json({
      message: 'Rate updated successfully!',
      rate,
    });
  });
};

exports.deleteRate = (req, res) => {
  const { id } = req.params;

  RateList.delete(id, (error) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the rate.',
        error,
      });
    }
    res.json({
      message: 'Rate deleted successfully!',
      id,
    });
  });
};
