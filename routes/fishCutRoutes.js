const express = require('express');
const fishCutRouter = express.Router();
const fishCutController = require('../controllers/fishCutController');

fishCutRouter.post('/fishCuts', fishCutController.createFishCut);
fishCutRouter.get('/fishCuts/:id', fishCutController.getFishCutById);
fishCutRouter.get('/fishCuts', fishCutController.getAllFishCuts);
fishCutRouter.put('/fishCuts/:id', fishCutController.updateFishCutById);
fishCutRouter.delete('/fishCuts/:id', fishCutController.deleteFishCutById);

module.exports = fishCutRouter;
