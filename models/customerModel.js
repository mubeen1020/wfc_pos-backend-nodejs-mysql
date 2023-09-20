const connection = require('../db'); 

class Customer {
  constructor(customer) {
    this.id = customer.id; 
    this.username = customer.username; 
    this.password = customer.username; 
    this.name = customer.name;
    this.care_of_ref = customer.care_of_ref;
    this.care_of_name = customer.care_of_name;
    this.phone_1 = customer.phone_1;
    this.phone_2 = customer.phone_2;
    this.phone_3 = customer.phone_3;
    this.address = customer.address;
    this.area = customer.area || 'Other';
    this.pin_location = customer.pin_location;
    this.distance = customer.distance || 0;
    this.delivery_charges = customer.delivery_charges || 0;
  }

  static create(newCustomer, result) {
    connection.query('INSERT INTO customer SET ?', newCustomer, (error, res) => {
      if (error) {
        console.error('Error creating a new customer:', error);
        result(error, null);
        return;
      }
      console.log('Created a new customer:', { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM customer', (error, res) => {
      if (error) {
        console.error('Error retrieving customers:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved customers:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM customer WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving customer by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found customer by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedCustomer, result) {
    connection.query('UPDATE customer SET ? WHERE id = ?', [updatedCustomer, id], (error, res) => {
      if (error) {
        console.error('Error updating the customer:', error);
        result(error, null);
        return;
      }
      console.log('Updated customer with ID', id);
      result(null, { id, ...updatedCustomer });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM customer WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the customer:', error);
        result(error, null);
        return;
      }
      console.log('Deleted customer with ID', id);
      result(null, { id });
    });
  }

  static search(query, result) {
    const searchTerm = `%${query}%`;
    const sql = `
    SELECT * FROM customer
    WHERE name LIKE ? OR username LIKE ?
  `;
  
    connection.query(sql, [searchTerm, searchTerm], (error, res) => {
      if (error) {
        console.error('Error searching for customers:', error);
        result(error, null);
        return;
      }
      console.log('Searched customers:', res);
      result(null, res);
    });
  }
}

module.exports = Customer;
