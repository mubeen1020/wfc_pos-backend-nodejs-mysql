const connection = require('../db'); // Import your database connection module

class OrderPurchaseItem {
  constructor(orderPurchaseItem) {
    this.order_id = orderPurchaseItem.order_id;
    this.fish_ref = orderPurchaseItem.fish_ref;
    this.fish_cut = orderPurchaseItem.fish_cut;
    this.fish_weight = orderPurchaseItem.fish_weight;
    this.meat_weight = orderPurchaseItem.meat_weight;
    this.preferred_fish_size = orderPurchaseItem.preferred_fish_size;
    this.other_instructions = orderPurchaseItem.other_instructions;
  }

  static create(newOrderPurchaseItem, result) {
    connection.query('INSERT INTO order_purchase_item SET ?', newOrderPurchaseItem, (error, res) => {
      if (error) {
        console.error('Error creating a new order purchase item:', error);
        result(error, null);
        return;
      }
      console.log('Created a new order purchase item:', { id: res.insertId, ...newOrderPurchaseItem });
      result(null, { id: res.insertId, ...newOrderPurchaseItem });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM order_purchase_item', (error, res) => {
      if (error) {
        console.error('Error retrieving order purchase items:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved order purchase items:', res);
      result(null, res);
    });
  }

  static getById(id, result) {
    connection.query('SELECT * FROM order_purchase_item WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error retrieving order purchase item by ID:', error);
        result(error, null);
        return;
      }
      if (res.length) {
        console.log('Found order purchase item by ID:', res[0]);
        result(null, res[0]);
        return;
      }
      result(null, null);
    });
  }

  static update(id, updatedOrderPurchaseItem, result) {
    connection.query('UPDATE order_purchase_item SET ? WHERE id = ?', [updatedOrderPurchaseItem, id], (error, res) => {
      if (error) {
        console.error('Error updating the order purchase item:', error);
        result(error, null);
        return;
      }
      console.log('Updated order purchase item with ID', id);
      result(null, { id, ...updatedOrderPurchaseItem });
    });
  }

  static delete(id, result) {
    connection.query('DELETE FROM order_purchase_item WHERE id = ?', id, (error, res) => {
      if (error) {
        console.error('Error deleting the order purchase item:', error);
        result(error, null);
        return;
      }
      console.log('Deleted order purchase item with ID', id);
      result(null, { id });
    });
  }
 
  static getSameFishRefAndFishCut(result){
    const query = `
    SELECT fish_ref, fish_cut, SUM(fish_weight) AS fish_weight, SUM(meat_weight) AS meat_weight
    FROM order_purchase_item
    GROUP BY fish_ref, fish_cut;
    `;
  
    connection.query(query, (error, res) => {
      if (error) {
        console.error('Error retrieving rows with the same fish_ref and fish_cut:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved rows with the same fish_ref and fish_cut:', res);
      result(null, res);
    });
  };

static searchByFishLocalNameOrFishCut(searchTerm, result) {
  const query = `
    SELECT *
    FROM order_purchase_item AS opi
    JOIN fish ON fish.id = opi.fish_ref
    WHERE fish.local_name LIKE ? 
  `;

  const searchValue = `%${searchTerm}%`; // Add '%' to the search term for partial matching

  connection.query(query, [searchValue, searchValue], (error, res) => {
    if (error) {
      console.error('Error searching for order purchase items:', error);
      result(error, null);
      return;
    }
    console.log('Retrieved order purchase items:', res);
    result(null, res);
  });
}



}

module.exports = OrderPurchaseItem;
