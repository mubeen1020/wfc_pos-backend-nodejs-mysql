const connection = require('../db');

class OrderstockItem {
  constructor(orderItem) {
    this.order_id = orderItem.order_id;
    this.fish_pack_ref = orderItem.fish_pack_ref;
    this.total_packs_ordered = orderItem.total_packs_ordered;
    this.fish_weight = orderItem.fish_weight;
    this.meat_weight = orderItem.meat_weight;
    this.fish_rate = orderItem.fish_rate;
    this.meat_rate = orderItem.meat_rate;
    this.skin = orderItem.skin || false; 
    this.pack_price = orderItem.pack_price;
    this.item_discount_absolute = orderItem.item_discount_absolute;
    this.item_discount_percent = orderItem.item_discount_percent;
  }

  static create(newOrderItem, result) {
    connection.query('INSERT INTO orderstock_items SET ?', newOrderItem, (error, res) => {
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
    connection.query('SELECT * FROM orderstock_items WHERE id = ?', orderItemId, (error, res) => {
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
    connection.query('SELECT * FROM orderstock_items', (error, res) => {
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
    connection.query('UPDATE orderstock_items SET ? WHERE id = ?', [updatedOrderItem, orderItemId], (error, res) => {
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
    connection.query('DELETE FROM orderstock_items WHERE id = ?', orderItemId, (error, res) => {
      if (error) {
        console.error('Error deleting Order Item:', error);
        result(error, null);
        return;
      }
      console.log('Deleted Order Item with ID:', orderItemId);
      result(null, { message: 'Order Item deleted' });
    });
  }

  static searchByCustomerFullName(customerFullName, result) {
    const queryString = `
      SELECT osi.*
      FROM orderstock_items AS osi
      JOIN orders AS o ON osi.order_id = o.id
      JOIN customers AS c ON o.customer = c.id
      WHERE c.full_name LIKE ?`;

    connection.query(queryString, [`%${customerFullName}%`], (error, res) => {
      if (error) {
        console.error('Error searching for Order Items by customer full name:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved Order Items by customer full name:', res);
      result(null, res);
    });
  }
}

module.exports = OrderstockItem;
