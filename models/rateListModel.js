const connection = require('../db');

class RateList {
  constructor(rate) {
    this.fish_name = rate.fish_name;
    this.fish_rate = rate.fish_rate;
    this.meat_rate = rate.meat_rate;
    this.full_service_charges = rate.full_service_charges;
    this.half_service_charges = rate.half_service_charges;
    this.minimum_order_weight = rate.minimum_order_weight;
  }

  static create(newRate, result) {
    connection.query('INSERT INTO rate_list SET ?', newRate, (error, res) => {
      if (error) {
        console.error('Error creating a new rate:', error);
        result(error, null);
        return;
      }
      console.log('Created a new rate:', { id: res.insertId, ...newRate });
      result(null, { id: res.insertId, ...newRate });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM rate_list', (error, res) => {
      if (error) {
        console.error('Error retrieving rates:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved rates:', res);
      result(null, res);
    });
  }

  static getById(paymentId, result) {
    connection.query('SELECT * FROM rate_list WHERE id = ?', paymentId, (error, res) => {
      if (error) {
        console.error('Error retrieving the rates:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found rates:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedRate, result) {
    connection.query('UPDATE rate_list SET ? WHERE id = ?', [updatedRate, id], (error, res) => {
      if (error) {
        console.error('Error updating rate:', error);
        result(error, null);
        return;
      }
      console.log('Updated rate with ID:', id);
      result(null, { id, ...updatedRate });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM rate_list WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting rate:', error);
        result(error, null);
        return;
      }
      console.log('Deleted rate with ID:', id);
      result(null, { id });
    });
  }
}

module.exports = RateList;
