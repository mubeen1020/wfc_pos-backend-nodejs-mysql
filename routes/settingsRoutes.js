const express = require('express');
const settingsrouter = express.Router();
const settingsController = require('../controllers/settingsController');

settingsrouter.post('/settings', settingsController.createSettings);
settingsrouter.put('/settings/:id', settingsController.updateSettings);
settingsrouter.delete('/settings/:id', settingsController.deleteSettings);
settingsrouter.get('/settings', settingsController.getAllSettings);

module.exports = settingsrouter;
