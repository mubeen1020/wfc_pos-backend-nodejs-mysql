const express = require('express');
const fishpackrouter = express.Router();
const fishPackController = require('../controllers/fishPackController');

fishpackrouter.post('/fishpack', fishPackController.createFishPack);
fishpackrouter.get('/fishpack/search', fishPackController.searchFishPacks);
fishpackrouter.get('/fishpack', fishPackController.getAllFishPacks);
fishpackrouter.get('/fishpack/min_max_purchaserate', fishPackController.getmin_max_rate);
fishpackrouter.get('/fishpack/:id', fishPackController.getFishPackById);
fishpackrouter.put('/fishpack/:id', fishPackController.updateFishPack);
fishpackrouter.delete('/fishpack/:id', fishPackController.deleteFishPack);


module.exports = fishpackrouter;
