const connection = require('../db');

class Userrole {
  constructor(user) {
    this.role = user.role || 'user'; 
  }

  static create(newrole, result) {
    connection.query('INSERT INTO user_roles SET ?', newrole, (error, res) => {
      if (error) {
        console.error('Error creating a new role:', error);
        result(error, null);
        return;
      }
      console.log('Created a new role:', { id: res.insertId, ...newrole });
      result(null, { id: res.insertId, ...newrole });
    });
  }

  static getAll(result) {
    connection.query('SELECT * FROM user_roles', (error, res) => {
      if (error) {
        console.error('Error retrieving role:', error);
        result(error, null);
        return;
      }
      console.log('Retrieved role:', res);
      result(null, res);
    });
  }

  static update(roleId, newRole, result) {
    connection.query('UPDATE user_roles SET role = ? WHERE id = ?', [newRole, roleId], (error, res) => {
      if (error) {
        console.error('Error updating the role:', error);
        result(error, null);
        return;
      }
      console.log('Updated the role:', { id: roleId, role: newRole });
      result(null, { id: roleId, role: newRole });
    });
  }

  static delete(roleId, result) {
    connection.query('DELETE FROM user_roles WHERE id = ?', roleId, (error, res) => {
      if (error) {
        console.error('Error deleting the role:', error);
        result(error, null);
        return;
      }
      console.log('Deleted the role with id:', roleId);
      result(null, { id: roleId });
    });
  }

}


module.exports = Userrole;
