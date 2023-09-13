const connection = require('../db'); // Import your database connection module

class OrderStatus {
  constructor(orderStatus) {
    this.order_status = orderStatus.order_status || 'new';
  }

  static create(newOrderStatus, result) {
    connection.query('INSERT INTO order_status SET ?', newOrderStatus, (error, res) => {
      if (error) {
        console.error('Error creating a new order status:', error);
        result(error, null);
        return;
      }
      console.log('Created a new order status:', { id: res.insertId, ...newOrderStatus });
      result(null, { id: res.insertId, ...newOrderStatus });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM order_status', (error, res) => {
      if (error) {
        console.error('Error retrieving order statuses:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved order statuses:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM order_status WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving order status by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found order status by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedOrderStatus, result) {
    connection.query('UPDATE order_status SET ? WHERE id = ?', [updatedOrderStatus, id], (error, res) => {
      if (error) {
        console.error('Error updating the order status:', error);
        result(error, null);
        return;
      }
      console.log('Updated order status with ID', id);
      result(null, { id, ...updatedOrderStatus });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM order_status WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the order status:', error);
        result(error, null);
        return;
      }
      console.log('Deleted order status with ID', id);
      result(null, { id });
    });
  }
}

module.exports = OrderStatus;
