const productsModel = require('../models/productsModel');

const getAll = async (id = null) => {
    if (id) {
      const response = await productsModel.getId(id);
      return response;
    }
    const response = await productsModel.getAll();
    return response;
};

const postProduct = async ({ name, quantity }) => {
  const [rows] = await getAll();
  const isNameThere = rows.find((item) => item.name === name);
  if (isNameThere) {
    return { status: 409, resp: { message: 'Product already exists' } };
  }
  await productsModel.postProduct(name, quantity);
  const [rows2] = await getAll();
  const newObject = rows2.find((item) => item.name === name);
  return { status: 201, resp: newObject };
};

const putProduct = async (id, name, quantity) => {
  const [rows] = await getAll();
  console.log(rows);
  const isIdThere = rows.some((item) => item.id === parseInt(id, 10));
  console.log(isIdThere);
  if (!isIdThere) {
    return { status: 404, resp: { message: 'Product not found' } };
  }
  console.log('service', id, name, quantity);
  await productsModel.putProduct(id, name, quantity);
  const [rows2] = await getAll();
  console.log(rows2);
  const newObject = rows2.find((item) => item.id === parseInt(id, 10));
  console.log(newObject);
  return { status: 200, resp: newObject };
};

module.exports = { getAll, postProduct, putProduct };