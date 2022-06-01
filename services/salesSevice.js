const salesModel = require('../models/salesModel');

const getAll = async (id = null) => {
    if (id) {
      const response = await salesModel.getId(id);
      return response;
    }
    const response = await salesModel.getAll();
    return response;
};

module.exports = { getAll };