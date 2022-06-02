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
  const newObject = rows2.filter((item) => item.name === name);
  return { status: 201, resp: newObject[0] };
};

module.exports = { getAll, postProduct };