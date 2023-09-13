const connection = require('../db'); 
class Fish {
  constructor(fish) {
    this.local_name = fish.local_name;
    this.english_name = fish.english_name;
    this.minimum_size = fish.minimum_size;
    this.maximum_size = fish.maximum_size;
    this.net_steaks = fish.net_steaks;
    this.net_boneless = fish.net_boneless;
    this.bones = fish.bones;
    this.min_rate = fish.min_rate;
    this.max_rate = fish.max_rate;
    this.average_rate = fish.average_rate;
    this.overall_purchase_quantity = fish.overall_purchase_quantity;
  }

  static create(newFish, result) {
    connection.query('INSERT INTO fish SET ?', newFish, (error, res) => {
      if (error) {
        console.error('Error creating a new fish:', error);
        result(error, null);
        return;
      }
      console.log('Created a new fish:', { id: res.insertId, ...newFish });
      result(null, { id: res.insertId, ...newFish });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM fish', (error, res) => {
      if (error) {
        console.error('Error retrieving fish:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved fish:', res);
      result(null, res);
    });
  }

  static getFishById(id, result) {
    connection.query('SELECT * FROM fish WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving fish:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved fish:', res);
      result(null, res);
    });
  }

  static update(id, updatedFish, result) {
    connection.query('UPDATE fish SET ? WHERE id = ?', [updatedFish, id], (error, res) => {
      if (error) {
        console.error('Error updating the fish:', error);
        result(error, null);
        return;
      }
      console.log('Updated the fish with ID', id);
      result(null, { id, ...updatedFish });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM fish WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the fish:', error);
        result(error, null);
        return;
      }
      console.log('Deleted the fish with ID', id);
      result(null, { id });
    });
  }
}

module.exports = Fish;
