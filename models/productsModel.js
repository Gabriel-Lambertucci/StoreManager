const connection = require('../db/index');

const getAll = async () => {
  const response = await connection.execute('SELECT * FROM StoreManager.products');
  return response[0];
};

const getId = async (id) => {
  const [rows] = await connection.execute(`SELECT * FROM StoreManager.products where id=${id}`);
  return [rows];
};

const postProduct = async (name, quantity) => {
  await connection.execute('INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
  [name, quantity]);
};

const putProduct = async (id, name, quantity) => {
  await connection.execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
  [name, quantity, id]);
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = { getAll, getId, postProduct, putProduct, deleteProduct };
