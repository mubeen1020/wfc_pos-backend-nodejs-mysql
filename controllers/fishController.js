const Fish = require('../models/fishModel');

exports.createFish = (req, res) => {
  const newFishData = req.body;

  Fish.create(newFishData, (error, newFish) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating the fish.',
        error,
      });
    }
    res.json({
      message: 'Fish created successfully!',
      newFish,
    });
  });
};

exports.getAllFish = (req, res) => {
  Fish.getAll((error, fishList) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving fish.',
        error,
      });
    }
    res.json({
      message: 'Retrieved fish successfully!',
      fishList,
    });
  });
};

exports.getFishById = (req, res) => {
    const { id } = req.params;
  
    Fish.getFishById(id, (error, fish) => {
      if (error) {
        return res.status(500).json({
          message: 'An error occurred while retrieving the fish.',
          error,
        });
      }
      if (!fish) {
        return res.status(404).json({
          message: 'Fish not found.',
        });
      }
      res.json({
        message: 'Found fish by ID!',
        fish,
      });
    });
  };

exports.updateFish = (req, res) => {
  const { id } = req.params;
  const updatedFishData = req.body;

  Fish.update(id, updatedFishData, (error, updatedFish) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating the fish.',
        error,
      });
    }
    res.json({
      message: 'Fish updated successfully!',
      updatedFish,
    });
  });
};

exports.deleteFish = (req, res) => {
  const { id } = req.params;

  Fish.delete(id, (error, deletedFish) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting the fish.',
        error,
      });
    }
    res.json({
      message: 'Fish deleted successfully!',
      deletedFish,
    });
  });
};

exports.searchFish = (req, res) => {
    const query = req.query.query;
    Fish.search(query, (error, fishes) => {
      if (error) {
        console.error('Error searching for fishes:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (fishes.length === 0) {
        return res.json({ message: 'Fish not found.' }).status(404);
      }
      return res.status(200).json(fishes);
    });
  };
