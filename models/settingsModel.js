const connection = require('../db');

class Settings {
  constructor(settings) {
    this.variable_profit_percent_per_kg = settings.variable_profit_percent_per_kg;
    this.fixed_profit_per_kg = settings.fixed_profit_per_kg;
    this.expense_per_kg = settings.expense_per_kg;
  }

  static create(newSettings, result) {
    connection.query('INSERT INTO settings SET ?', newSettings, (error, res) => {
      if (error) {
        console.error('Error creating new settings:', error);
        result(error, null);
        return;
      }
      console.log('Created new settings:', { id: res.insertId, ...newSettings });
      result(null, { id: res.insertId, ...newSettings });
    });
  }

  static update(id, updatedSettings, result) {
    connection.query('UPDATE settings SET ? WHERE id = ?', [updatedSettings, id], (error, res) => {
      if (error) {
        console.error('Error updating settings:', error);
        result(error, null);
        return;
      }
      console.log('Updated settings with id:', id);
      result(null, { id, ...updatedSettings });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM settings WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting settings:', error);
        result(error, null);
        return;
      }
      console.log('Deleted settings with id:', id);
      result(null, { id });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM settings', (error, res) => {
      if (error) {
        console.error('Error retrieving settings:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved settings:', res);
      result(null, res);
    });
  }
}

module.exports = Settings;
