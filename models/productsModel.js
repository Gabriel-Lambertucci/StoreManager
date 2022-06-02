const connection = require('../db/index');

const getAll = async () => {
  const response = await connection.execute('SELECT * FROM StoreManager.products');
  return response;
};

const getId = async (id) => {
  const response = await connection.execute(`SELECT * FROM StoreManager.products where id=${id}`);
  return response;
};

const postProduct = async (name, quantity) => {
  await connection.execute('INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  [name, quantity]);
};

module.exports = { getAll, getId, postProduct };
