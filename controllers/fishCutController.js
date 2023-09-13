const FishCut = require('../models/fishCutModel');

exports.createFishCut = (req, res) => {
  const { fish_cut } = req.body;

  const newFishCut = new FishCut({
    fish_cut,
  });

  FishCut.create(newFishCut, (error, fishCut) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new Fish Cut.',
        error,
      });
    }
    res.json({
      message: 'Fish Cut created successfully!',
      fishCut,
    });
  });
};

exports.getFishCutById = (req, res) => {
  const { id } = req.params;

  FishCut.getById(id, (error, fishCut) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Fish Cut by ID.',
        error,
      });
    }
    if (!fishCut) {
      return res.status(404).json({
        message: 'Fish Cut not found.',
      });
    }
    res.json({
      message: 'Found Fish Cut by ID!',
      fishCut,
    });
  });
};

exports.getAllFishCuts = (req, res) => {
  FishCut.getAll((error, fishCuts) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Fish Cuts.',
        error,
      });
    }
    res.json({
      message: 'Retrieved Fish Cuts successfully!',
      fishCuts,
    });
  });
};

exports.updateFishCutById = (req, res) => {
  const { id } = req.params;
  const updatedFishCut = req.body;

  FishCut.updateById(id, updatedFishCut, (error, fishCut) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating Fish Cut by ID.',
        error,
      });
    }
    res.json({
      message: 'Updated Fish Cut by ID!',
      fishCut,
    });
  });
};

exports.deleteFishCutById = (req, res) => {
  const { id } = req.params;

  FishCut.deleteById(id, (error) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting Fish Cut by ID.',
        error,
      });
    }
    res.json({
      message: 'Deleted Fish Cut by ID!',
      id
    });
  });
};
