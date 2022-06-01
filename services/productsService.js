const productsModel = require('../models/productsModel');

const getAll = async (id = null) => {
    if (id) {
      const response = await productsModel.getId(id);
      return response;
    }
    const response = await productsModel.getAll();
    return response;
};

module.exports = { getAll };