const productsModel = require('../models/productsModel');

const getAll = async (id = null) => {
  try {
    if(id) {
      const response = await productsModel.getId(id);
      return response;
    }
    const response = await productsModel.getAll();
    return response;
  } catch (err) {
    console.error(err);
  }
  
}

module.exports = { getAll };