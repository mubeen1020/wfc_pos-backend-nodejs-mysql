const OrderPurchaseItem = require('../models/orderPurchaseItemModel');

module.exports = {
    orderPurchaseItemcreate: function (req, res) {
    const orderPurchaseItemData = req.body;
    OrderPurchaseItem.create(orderPurchaseItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(result);
      }
    });
  },

  orderPurchaseItemgetAll: function (req, res) {
    OrderPurchaseItem.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  },

  orderPurchaseItemgetById: function (req, res) {
    const id = req.params.id;
    OrderPurchaseItem.getById(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!result) {
        res.status(404).json({ message: 'Order Purchase Item not found' });
      } else {
        res.json(result);
      }
    });
  },

  orderPurchaseItemupdate: function (req, res) {
    const id = req.params.id;
    const orderPurchaseItemData = req.body;
    OrderPurchaseItem.update(id, orderPurchaseItemData, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(result);
      }
    });
  },

  orderPurchaseItemdelete: function (req, res) {
    const id = req.params.id;
    OrderPurchaseItem.delete(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Order Purchase Item deleted successfully' });
      }
    });
  },

  getSameFishRefAndFishCut:function (req, res) {
    OrderPurchaseItem.getSameFishRefAndFishCut((err, data) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(data);
    });
  }
};
