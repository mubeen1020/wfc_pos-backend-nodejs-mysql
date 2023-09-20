const express = require('express');
const fishrouter = express.Router();
const fishController = require('../controllers/fishController');

fishrouter.post('/fish', fishController.createFish);
fishrouter.get('/fish', fishController.getAllFish);
fishrouter.get('/fish/search', fishController.searchFish);
fishrouter.get('/fish/:id', fishController.getFishById);
fishrouter.put('/fish/:id', fishController.updateFish);
fishrouter.delete('/fish/:id', fishController.deleteFish);

module.exports = fishrouter;
