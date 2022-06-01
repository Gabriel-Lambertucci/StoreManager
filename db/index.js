const mysql = require('mysql2/promise');

// Conexao com o banco de dados
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'gabriel-lambertucci',
  password: process.env.MYSQL_PASSWORD || 'ps3rules',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  port: process.env.MYSQL_PORT || 3306,
});

module.exports = connection;
