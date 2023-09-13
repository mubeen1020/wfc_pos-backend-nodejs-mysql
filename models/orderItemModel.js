const connection = require('../db');

class OrderItem {
  constructor(orderItem) {
    this.order_id = orderItem.order_id;
    this.fish_id = orderItem.fish_id;
    this.fish_cut = orderItem.fish_cut || 'steaks'; 
    this.total_packs_order = orderItem.total_packs_order;
    this.pack_ref = orderItem.pack_ref;
    this.total_packs_available = orderItem.total_packs_available;
    this.packing_date = orderItem.packing_date;
    this.average_fish_size = orderItem.average_fish_size;
    this.fish_weight = orderItem.fish_weight;
    this.meat_weight = orderItem.meat_weight;
    this.fish_rate = orderItem.fish_rate;
    this.meat_rate = orderItem.meat_rate;
    this.skin = orderItem.skin || false; 
    this.kante = orderItem.kante;
    this.pack_price = orderItem.pack_price;
    this.item_discount_absolute = orderItem.item_discount_absolute;
    this.item_discount_percent = orderItem.item_discount_percent;
  }

  static create(newOrderItem, result) {
    connection.query('INSERT INTO order_item SET ?', newOrderItem, (error, res) => {
      if (error) {
        console.error('Error creating a new Order Item:', error);
        result(error, null);
        return;
      }
      console.log('Created a new Order Item:', { id: res.insertId, ...newOrderItem });
      result(null, { id: res.insertId, ...newOrderItem });
    });
  }

  static getById(orderItemId, result) {
    connection.query('SELECT * FROM order_item WHERE id = ?', orderItemId, (error, res) => {
      if (error) {
        console.error('Error retrieving Order Item:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found Order Item:', res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: 'Order Item not found' }, null);
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM order_item', (error, res) => {
      if (error) {
        console.error('Error retrieving Order Items:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved Order Items:', res);
      result(null, res);
    });
  }

  static updateById(orderItemId, updatedOrderItem, result) {
    connection.query('UPDATE order_item SET ? WHERE id = ?', [updatedOrderItem, orderItemId], (error, res) => {
      if (error) {
        console.error('Error updating Order Item:', error);
        result(error, null);
        return;
      }
      console.log('Updated Order Item with ID:', orderItemId);
      result(null, { id: orderItemId, ...updatedOrderItem });
    });
  }

  static deleteById(orderItemId, result) {
    connection.query('DELETE FROM order_item WHERE id = ?', orderItemId, (error, res) => {
      if (error) {
        console.error('Error deleting Order Item:', error);
        result(error, null);
        return;
      }
      console.log('Deleted Order Item with ID:', orderItemId);
      result(null, { message: 'Order Item deleted' });
    });
  }
}

module.exports = OrderItem;
