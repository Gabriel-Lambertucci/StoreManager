const salesModel = require('../models/salesModel');

const getAll = async (id = null) => {
    if (id) {
      const response = await salesModel.getId(id);
      return response;
    }
    const response = await salesModel.getAll();
    return response;
};

const postSale = async (productId, quantity) => {
  const completeDate = `
  ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 
  ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  const response = await salesModel.postSale(completeDate, productId, quantity);
  return response;
};

module.exports = { getAll, postSale };