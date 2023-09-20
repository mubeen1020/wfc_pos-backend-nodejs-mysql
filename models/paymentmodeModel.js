const connection = require('../db');

class PaymentMode {
  constructor(paymentmode) {
    this.payment_mode = paymentmode.payment_mode; 
  }

  static create(newpaymentmode, result) {
    connection.query('INSERT INTO payment_modes SET ?', newpaymentmode, (error, res) => {
      if (error) {
        console.error('Error creating a new Payment Mode:', error);
        result(error, null);
        return;
      }
      console.log('Created a new Payment Mode:', { id: res.insertId, ...newpaymentmode });
      result(null, { id: res.insertId, ...newpaymentmode });
    });
  }

  static getById(paymentmodeId, result) {
    connection.query('SELECT * FROM payment_modes WHERE id = ?', paymentmodeId, (error, res) => {
      if (error) {
        console.error('Error retrieving Payment Mode:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found Payment Mode:', res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: 'Payment Mode not found' }, null);
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM payment_modes', (error, res) => {
      if (error) {
        console.error('Error retrieving Payment Modes:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved Payment Modes:', res);
      result(null, res);
    });
  }

  static updateById(paymentmodeId, updatedFishCut, result) {
    connection.query('UPDATE payment_modes SET ? WHERE id = ?', [updatedFishCut, paymentmodeId], (error, res) => {
      if (error) {
        console.error('Error updating Payment Mode:', error);
        result(error, null);
        return;
      }
      console.log('Updated Payment Mode with ID:', paymentmodeId);
      result(null, { id: paymentmodeId, ...updatedFishCut });
    });
  }

  static deleteById(paymentmodeId, result) {
    connection.query('DELETE FROM payment_modes WHERE id = ?', paymentmodeId, (error, res) => {
      if (error) {
        console.error('Error deleting Payment Mode:', error);
        result(error, null);
        return;
      }
      console.log('Deleted Payment Mode with ID:', paymentmodeId);
      result(null, { message: 'Payment Mode deleted' });
    });
  }
}

module.exports = PaymentMode
