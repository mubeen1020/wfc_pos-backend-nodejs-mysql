const connection = require('../db'); 

class FishPack {
  constructor(fishPack) {
    this.packing_date = fishPack.packing_date;
    this.fish_id = fishPack.fish_id;
    this.whole_fish_payment = fishPack.whole_fish_payment;
    this.whole_fish_weight = fishPack.whole_fish_weight;
    this.whole_fish_packs = fishPack.whole_fish_packs;
    this.whole_fish_pack_weight = fishPack.whole_fish_weight / fishPack.whole_fish_packs;
    this.whole_fish_rate = fishPack.whole_fish_payment / fishPack.whole_fish_weight;
    this.net_meat_weight = fishPack.net_meat_weight || 0;
    this.net_meat_rate = fishPack.net_meat_weight === 0 ? 0 : fishPack.whole_fish_payment / fishPack.net_meat_weight;
    this.bone_weight = fishPack.bone_weight || 0;
    this.bone_packs = fishPack.bone_packs || 0;
    this.bone_rate = fishPack.bone_packs === 0 ? 0 : fishPack.bone_weight / fishPack.bone_packs;
    this.fish_cut = fishPack.fish_cut || 'Steaks';
    this.average_fish_piece_size = fishPack.average_fish_piece_size || null;
    this.head_removed = fishPack.head_removed || false;
    this.skin_removed = fishPack.skin_removed || false;
    this.kante = fishPack.kante || 'None';
    this.available_packs = fishPack.whole_fish_packs;
  }

  static create(newFishPack, result) {
    connection.query('INSERT INTO fish_pack SET ?', newFishPack, (error, res) => {
      if (error) {
        console.error('Error creating a new fish pack:', error);
        result(error, null);
        return;
      }
      console.log('Created a new fish pack:', { id: res.insertId, ...newFishPack });
      result(null, { id: res.insertId, ...newFishPack });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM fish_pack', (error, res) => {
      if (error) {
        console.error('Error retrieving fish packs:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved fish packs:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM fish_pack WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving fish pack by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found fish pack by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedFishPack, result) {
    connection.query('UPDATE fish_pack SET ? WHERE id = ?', [updatedFishPack, id], (error, res) => {
      if (error) {
        console.error('Error updating the fish pack:', error);
        result(error, null);
        return;
      }
      console.log('Updated fish pack with ID', id);
      result(null, { id, ...updatedFishPack });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM fish_pack WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the fish pack:', error);
        result(error, null);
        return;
      }
      console.log('Deleted fish pack with ID', id);
      result(null, { id });
    });
  }
}

module.exports = FishPack;
