const productsService = require('../services/productsService');

const getFunction = async (req, res) => {
  try {
    const response = await productsService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'erro productsController' });
  }
};

const getIdFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsService.getAll(id);
    if (response[0].length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(response[0][0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Error' });
  }
};

const postFunction = async (req, res) => {
  try {
    const response = await productsService.postProduct(req.body);
    return res.status(response.status).json(response.resp);
  } catch (err) {
    console.log(err.message);
  }
};

const putFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const response = await productsService.putProduct(id, name, quantity);
    return res.status(response.status).json(response.resp);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.deleteProduct(id);
    if (response) {
      return res.status(response.status).json(response.resp);
    }
    return res.status(204).json();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getFunction, getIdFunction, postFunction, putFunction, deleteFunction };
