const connection = require('../db/index');

const getAll = async () => {
  const response = await connection.execute('SELECT * FROM StoreManager.products');
  return response;
}

const getId = async (id) => {
  const response = await connection.execute(`SELECT * FROM StoreManager.products where id=${id}`);
  return response;
}

module.exports = { getAll, getId };