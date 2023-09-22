const connection = require('../db'); // Import your database connection module

class Order {
  constructor(order) {
    this.customer = order.customer;
    this.order_date = order.order_date;
    this.delivery_deadline = order.delivery_deadline;
    this.order_status = order.order_status || 'new';
    this.delivery_charges = order.delivery_charges;
    this.urgent_delivery_charges = order.urgent_delivery_charges || 0;
    this.order_total = order.order_total || 0;
    this.payment_status = order.payment_status || 'unpaid';
  }

  static create(newOrder, result) {
    connection.query('INSERT INTO orders SET ?', newOrder, (error, res) => {
      if (error) {
        console.error('Error creating a new order:', error);
        result(error, null);
        return;
      }
      console.log('Created a new order:', { id: res.insertId, ...newOrder });
      result(null, { id: res.insertId, ...newOrder });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM orders', (error, res) => {
      if (error) {
        console.error('Error retrieving orders:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved orders:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM orders WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving order by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found order by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedOrder, result) {
    connection.query('UPDATE orders SET ? WHERE id = ?', [updatedOrder, id], (error, res) => {
      if (error) {
        console.error('Error updating the order:', error);
        result(error, null);
        return;
      }
      console.log('Updated order with ID', id);
      result(null, { id, ...updatedOrder });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM orders WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the order:', error);
        result(error, null);
        return;
      }
      console.log('Deleted order with ID', id);
      result(null, { id });
    });
  }

  static searchByCustomerName(customerName, result) {
    const query = `
      SELECT o.*
      FROM orders o
      JOIN customers c ON o.customer = c.id
      WHERE c.full_name LIKE ?
    `;
    const searchTerm = `%${customerName}%`; 

    connection.query(query, [searchTerm], (error, res) => {
      if (error) {
        console.error('Error searching orders by customer name:', error);
        result(error, null);
        return;
      }
      console.log(`Searched orders by customer name '${customerName}':`, res);
      result(null, res);
    });
  }
}

module.exports = Order;
