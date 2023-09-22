const connection = require('../db'); 

class FishPack {
  constructor(fishPack) {
    this.packing_date = fishPack.packing_date;
    this.fish_ref = fishPack.fish_ref;
    this.whole_fish_payment = fishPack.whole_fish_payment;
    this.whole_fish_total_weight = fishPack.whole_fish_total_weight;
    this.fish_packs = fishPack.fish_packs;
    this.net_meat_total_weight = fishPack.net_meat_total_weight;
    this.bones_total_weight = fishPack.bones_total_weight;
    this.bones_packs = fishPack.bones_packs;
    this.whole_fish_pack_weight = fishPack.whole_fish_pack_weight;
    this.whole_fish_pack_price = fishPack.whole_fish_pack_price;
    this.whole_fish_purchase_rate = fishPack.whole_fish_purchase_rate;
    this.whole_fish_sale_rate = fishPack.whole_fish_sale_rate;
    this.net_meat_pack_weight = fishPack.net_meat_pack_weight;
    this.net_meat_weight_per_kg = fishPack.net_meat_weight_per_kg;
    this.net_meat_sale_rate = fishPack.net_meat_sale_rate;
    this.bones_pack_weight = fishPack.bones_pack_weight;
    this.bones_pack_price = fishPack.bones_pack_price;
    this.bones_pack_rate = fishPack.bones_pack_rate;
    this.available_meat_packs = fishPack.available_meat_packs,
    this.available_bones_packs = fishPack.available_bones_packs,
    this.fish_cut = fishPack.fish_cut;
    this.average_fish_piece_size = fishPack.average_fish_piece_size;
    this.head_removed = fishPack.head_removed;
    this.skin_removed = fishPack.skin_removed;
    this.kante = fishPack.kante;
    this.available_packs = fishPack.available_packs;
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

  static searchByPackingDateAndFishRef(packingDate, fishRef, result) {
    const query = `
    SELECT * FROM fish_pack 
    WHERE packing_date = ? 
    OR (fish_ref IN (SELECT id FROM fish WHERE local_name = ?))
`;
console.log('Constructed SQL Query:', query);
    connection.query(query, [packingDate, fishRef], (error, res) => {
      if (error) {
        console.error('Error searching fish packs:', error);
        result(error, null);
        return;
      }
      console.log('Searched fish packs:', res);
      result(null, res);
    });
  }
  
}

module.exports = FishPack;
