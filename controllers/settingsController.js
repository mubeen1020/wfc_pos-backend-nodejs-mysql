const Settings = require('../models/settingsModel');

exports.createSettings = (req, res) => {
  const newSettings = new Settings(req.body);
  Settings.create(newSettings, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'An error occurred while creating new settings.',
        error: err,
      });
    } else {
      res.status(201).json({
        message: 'Created new settings successfully.',
        settings: data,
      });
    }
  });
};

exports.updateSettings = (req, res) => {
  const { id } = req.params;
  const updatedSettings = req.body;
  Settings.update(id, updatedSettings, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'An error occurred while updating settings.',
        error: err,
      });
    } else {
      res.json({
        message: `Updated settings with ID ${id} successfully.`,
        settings: data,
      });
    }
  });
};

exports.deleteSettings = (req, res) => {
  const { id } = req.params;
  Settings.delete(id, (err) => {
    if (err) {
      res.status(500).json({
        message: 'An error occurred while deleting settings.',
        error: err,
      });
    } else {
      res.json({
        message: `Deleted settings with ID ${id} successfully.`,
        id
      });
    }
  });
};

exports.getAllSettings = (req, res) => {
  Settings.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: 'An error occurred while retrieving settings.',
        error: err,
      });
    } else {
      res.json({
        message: 'Retrieved settings successfully.',
        settings: data,
      });
    }
  });
};
