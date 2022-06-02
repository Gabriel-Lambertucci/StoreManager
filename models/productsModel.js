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

const putProduct = async (id, name, quantity) => {
  await connection.execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
  [name, quantity, id]);
};

module.exports = { getAll, getId, postProduct, putProduct };
