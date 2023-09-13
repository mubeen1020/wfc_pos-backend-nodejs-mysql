const connection = require('../db');

class PaymentMethod {
  constructor(paymentMethod) {
    this.name = paymentMethod.name;
  }

  static create(newPaymentMethod, result) {
    connection.query('INSERT INTO payment_methods SET ?', newPaymentMethod, (error, res) => {
      if (error) {
        console.error('Error creating a new payment method:', error);
        result(error, null);
        return;
      }
      console.log('Created a new payment method:', { id: res.insertId, ...newPaymentMethod });
      result(null, { id: res.insertId, ...newPaymentMethod });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM payment_methods', (error, res) => {
      if (error) {
        console.error('Error retrieving payment methods:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved payment methods:', res);
      result(null, res);
    });
  }

  static getById(paymentMethodId, result) {
    connection.query('SELECT * FROM payment_methods WHERE id = ?', paymentMethodId, (error, res) => {
      if (error) {
        console.error('Error retrieving payment method:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found payment method:', res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: 'Payment method not found' }, null);
    });
  }

  static updateById(paymentMethodId, updatedPaymentMethod, result) {
    connection.query('UPDATE payment_methods SET ? WHERE id = ?', [updatedPaymentMethod, paymentMethodId], (error, res) => {
      if (error) {
        console.error('Error updating payment method:', error);
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: 'Payment method not found' }, null);
        return;
      }
      console.log('Updated payment method with ID:', paymentMethodId);
      result(null, { id: paymentMethodId, ...updatedPaymentMethod });
    });
  }

  static deleteById(paymentMethodId, result) {
    connection.query('DELETE FROM payment_methods WHERE id = ?', paymentMethodId, (error, res) => {
      if (error) {
        console.error('Error deleting payment method:', error);
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        result({ message: 'Payment method not found' }, null);
        return;
      }
      console.log('Deleted payment method with ID:', paymentMethodId);
      result(null, { id: paymentMethodId, message: 'Payment method deleted successfully' });
    });
  }
}

module.exports = PaymentMethod;
