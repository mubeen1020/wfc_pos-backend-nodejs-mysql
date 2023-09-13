const connection = require('../db'); 

class PaymentStatus {
  constructor(paymentStatus) {
    this.payment_status = paymentStatus.payment_status || 'unpaid';
  }

  static create(newPaymentStatus, result) {
    connection.query('INSERT INTO payment_status SET ?', newPaymentStatus, (error, res) => {
      if (error) {
        console.error('Error creating a new payment status:', error);
        result(error, null);
        return;
      }
      console.log('Created a new payment status:', { id: res.insertId, ...newPaymentStatus });
      result(null, { id: res.insertId, ...newPaymentStatus });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM payment_status', (error, res) => {
      if (error) {
        console.error('Error retrieving payment statuses:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved payment statuses:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM payment_status WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving payment status by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found payment status by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedPaymentStatus, result) {
    connection.query('UPDATE payment_status SET ? WHERE id = ?', [updatedPaymentStatus, id], (error, res) => {
      if (error) {
        console.error('Error updating the payment status:', error);
        result(error, null);
        return;
      }
      console.log('Updated payment status with ID', id);
      result(null, { id, ...updatedPaymentStatus });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM payment_status WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the payment status:', error);
        result(error, null);
        return;
      }
      console.log('Deleted payment status with ID', id);
      result(null, { id });
    });
  }
}

module.exports = PaymentStatus;
