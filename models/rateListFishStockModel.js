const connection = require('../db'); // Import your database connection module

class RateListFishStock {
  constructor(rate) {
    this.fish_name = rate.fish_name;
    this.fish_cut = rate.fish_cut;
    this.fish_rate = rate.fish_rate;
    this.meat_rate = rate.meat_rate;
    this.fish_weight = rate.fish_weight;
    this.meat_weight = rate.meat_weight;
  }

  static create(newRate, result) {
    connection.query('INSERT INTO rate_list_fish_stock SET ?', newRate, (error, res) => {
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
    connection.query('SELECT * FROM rate_list_fish_stock', (error, res) => {
      if (error) {
        console.error('Error retrieving rates:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved rates:', res);
      result(null, res);
    });
  }

  static getById(rateId, result) {
    connection.query('SELECT * FROM rate_list_fish_stock WHERE id = ?', rateId, (error, res) => {
      if (error) {
        console.error('Error retrieving rate:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found rate:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(rateId, updatedRate, result) {
    connection.query('UPDATE rate_list_fish_stock SET ? WHERE id = ?', [updatedRate, rateId], (error, res) => {
      if (error) {
        console.error('Error updating rate:', error);
        result(error, null);
        return;
      }
      console.log('Updated rate with ID:', rateId);
      result(null, { id: rateId, ...updatedRate });
    });
  }

  static delete(rateId, result) {
    connection.query('DELETE FROM rate_list_fish_stock WHERE id = ?', rateId, (error, res) => {
      if (error) {
        console.error('Error deleting rate:', error);
        result(error, null);
        return;
      }
      console.log('Deleted rate with ID:', rateId);
      result(null, { id: rateId });
    });
  }
}

module.exports = RateListFishStock;
