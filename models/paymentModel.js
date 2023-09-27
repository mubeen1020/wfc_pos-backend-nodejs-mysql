const connection = require('../db');

class Payment {
  constructor(payment) {
    this.customer = payment.customer;
    this.payment_date = payment.payment_date;
    this.payment_amount = payment.payment_amount;
    this.payment_method = payment.payment_method;
    this.recieving_staff = payment.recieving_staff;
    this.recieving_account = payment.recieving_account;
    this.payment_balance = payment.payment_balance;
    this.payment_tip = payment.payment_tip;
    this.tip_for_rider = payment.tip_for_rider;
  }

  static create(newPayment, result) {
    connection.query('INSERT INTO payments SET ?', newPayment, (error, res) => {
      if (error) {
        console.error('Error creating a new payment:', error);
        result(error, null);
        return;
      }
      console.log('Created a new payment:', { id: res.insertId, ...newPayment });
      result(null, { id: res.insertId, ...newPayment });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM payments', (error, res) => {
      if (error) {
        console.error('Error retrieving payments:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved payments:', res);
      result(null, res);
    });
  }

  static getById(paymentId, result) {
    connection.query('SELECT * FROM payments WHERE id = ?', paymentId, (error, res) => {
      if (error) {
        console.error('Error retrieving the payment:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found payment:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(paymentId, updatedPayment, result) {
    connection.query('UPDATE payments SET ? WHERE id = ?', [updatedPayment, paymentId], (error, res) => {
      if (error) {
        console.error('Error updating the payment:', error);
        result(error, null);
        return;
      }
      console.log('Updated the payment with id:', paymentId);
      result(null, { id: paymentId, ...updatedPayment });
    });
  }

  static delete(paymentId, result) {
    connection.query('DELETE FROM payments WHERE id = ?', paymentId, (error, res) => {
      if (error) {
        console.error('Error deleting the payment:', error);
        result(error, null);
        return;
      }
      console.log('Deleted the payment with id:', paymentId);
      result(null, { id: paymentId });
    });
  }

  static searchByCustomerFullName(searchTerm, result) {
    const query = `
      SELECT payments.*, customers.*
      FROM payments
      JOIN customers ON customers.id = payments.customer
      WHERE customers.full_name LIKE ?;
    `;

    const searchValue = `%${searchTerm}%`; 

    connection.query(query, [searchValue], (error, res) => {
      if (error) {
        console.error('Error searching for payments by customer full name:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved payments:', res);
      result(null, res);
    });
  }

}

module.exports = Payment;
