const FishPack = require('../models/fishPackModel');

exports.createFishPack = (req, res) => {
  const newFishPackData = req.body;

  FishPack.create(newFishPackData, (error, newFishPack) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the fish pack.',
        error,
      });
    }
    res.json({
      message: 'Fish pack created successfully!',
      newFishPack,
    });
  });
};

exports.getAllFishPacks = (req, res) => {
  FishPack.getAll((error, fishPacks) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving fish packs.',
        error,
      });
    }
    res.json({
      message: 'Retrieved fish packs successfully!',
      fishPacks,
    });
  });
};

exports.getFishPackById = (req, res) => {
    const { id } = req.params;
  
    FishPack.getById(id, (error, fishPack) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while retrieving the fish pack.',
          error,
        });
      }
      if (!fishPack) {
        return res.status(404).json({
          message: 'Fish pack not found.',
        });
      }
      res.json({
        message: 'Found fish pack by ID!',
        fishPack,
      });
    });
  };
  
  exports.updateFishPack = (req, res) => {
    const { id } = req.params;
    const updatedFishPackData = req.body;
  
    FishPack.update(id, updatedFishPackData, (error, updatedFishPack) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while updating the fish pack.',
          error,
        });
      }
      res.json({
        message: 'Fish pack updated successfully!',
        updatedFishPack,
      });
    });
  };
  
  exports.deleteFishPack = (req, res) => {
    const { id } = req.params;
  
    FishPack.delete(id, (error, deletedFishPack) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while deleting the fish pack.',
          error,
        });
      }
      res.json({
        message: 'Fish pack deleted successfully!',
        deletedFishPack,
      });
    });
  };

  exports.searchFishPacks = (req, res) => {
    const { packingDate, fishRef } = req.query;
   
    FishPack.searchByPackingDateAndFishRef(packingDate, fishRef, (error, fishPacks) => {
      if (error) {
        return res.status(500).json({ error: 'Error searching fish packs' });
      }
      
      res.status(200).json({ fishPacks });
    });
  };