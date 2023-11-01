const OrderstockItem = require('../models/orderstockItemModel');

exports.createOrderItem = (req, res) => {
  const {
    order_id,
    fish_pack_ref,
    total_packs_ordered,
    fish_weight,
    meat_weight,
    fish_rate,
    meat_rate,
    skin,
    kante,
    pack_price,
    item_discount_absolute,
    item_discount_percent,
    is_bone
  } = req.body;

const newOrderItem = new OrderstockItem({
    order_id,
    fish_pack_ref,
    total_packs_ordered,
    fish_weight,
    meat_weight,
    fish_rate,
    meat_rate,
    skin,
    kante,
    pack_price,
    item_discount_absolute,
    item_discount_percent,
    is_bone
});

OrderstockItem.create(newOrderItem, (error, orderItem) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while creating a new Order Item.',
        error,
      });
    }
    res.json({
      message: 'Order Item created successfully!',
      orderItem,
    });
  });
};

exports.getOrderItemById = (req, res) => {
  const { id } = req.params;

  OrderstockItem.getById(id, (error, orderItem) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Order Item by ID.',
        error,
      });
    }
    if (!orderItem) {
      return res.status(404).json({
        message: 'Order Item not found.',
      });
    }
    res.json({
      message: 'Found Order Item by ID!',
      orderItem,
    });
  });
};

exports.getAllOrderItems = (req, res) => {
  OrderstockItem.getAll((error, orderItems) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while retrieving Order Items.',
        error,
      });
    }
    res.json({
      message: 'Retrieved Order Items successfully!',
      orderItems,
    });
  });
};

exports.updateOrderItem = (req, res) => {
  const { id } = req.params;
  const updatedOrderItem = req.body;

  OrderstockItem.updateById(id, updatedOrderItem, (error, orderItem) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while updating Order Item.',
        error,
      });
    }
    res.json({
      message: 'Updated Order Item successfully!',
      orderItem,
    });
  });
};

exports.deleteOrderItem = (req, res) => {
  const { id } = req.params;

  OrderstockItem.deleteById(id, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'An error occurred while deleting Order Item.',
        error,
      });
    }
    res.json
    ({result,id});
  });
};

exports.searchByCustomerFullName = (req, res) => {
  const { customerFullName } = req.query; 
  
  OrderstockItem.searchByCustomerFullName(customerFullName, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Error retrieving Order Items by customer full name',
        error: err,
      });
    } else {
      res.status(200).json(data);
    }
  });
};
