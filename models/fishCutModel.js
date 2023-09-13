const connection = require('../db');

class FishCut {
  constructor(fishCut) {
    this.fish_cut = fishCut.fish_cut || 'steaks'; // Default value is 'steaks'
  }

  static create(newFishCut, result) {
    connection.query('INSERT INTO fish_cut SET ?', newFishCut, (error, res) => {
      if (error) {
        console.error('Error creating a new Fish Cut:', error);
        result(error, null);
        return;
      }
      console.log('Created a new Fish Cut:', { id: res.insertId, ...newFishCut });
      result(null, { id: res.insertId, ...newFishCut });
    });
  }

  static getById(fishCutId, result) {
    connection.query('SELECT * FROM fish_cut WHERE id = ?', fishCutId, (error, res) => {
      if (error) {
        console.error('Error retrieving Fish Cut:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found Fish Cut:', res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: 'Fish Cut not found' }, null);
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM fish_cut', (error, res) => {
      if (error) {
        console.error('Error retrieving Fish Cuts:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved Fish Cuts:', res);
      result(null, res);
    });
  }

  static updateById(fishCutId, updatedFishCut, result) {
    connection.query('UPDATE fish_cut SET ? WHERE id = ?', [updatedFishCut, fishCutId], (error, res) => {
      if (error) {
        console.error('Error updating Fish Cut:', error);
        result(error, null);
        return;
      }
      console.log('Updated Fish Cut with ID:', fishCutId);
      result(null, { id: fishCutId, ...updatedFishCut });
    });
  }

  static deleteById(fishCutId, result) {
    connection.query('DELETE FROM fish_cut WHERE id = ?', fishCutId, (error, res) => {
      if (error) {
        console.error('Error deleting Fish Cut:', error);
        result(error, null);
        return;
      }
      console.log('Deleted Fish Cut with ID:', fishCutId);
      result(null, { message: 'Fish Cut deleted' });
    });
  }
}

module.exports = FishCut;
