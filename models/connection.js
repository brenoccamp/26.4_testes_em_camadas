const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senha_muito_segura',
  database: 'model_example'
});

module.exports = connection;