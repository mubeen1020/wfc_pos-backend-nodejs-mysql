const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'root',
  database: 'wfc_pos',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
