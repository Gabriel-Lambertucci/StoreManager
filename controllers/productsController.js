const express = require('express');

const router = express.Router();

const productsService = require('../services/productsService');
const productsMiddleware = require('../middlewares/productsMiddleware');

router.get('/', async (req, res) => {
  try {
    const [rows] = await productsService.getAll();
    res.status(200).json(rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'erro productsController' });
  }
});

router.get('/:id', async (req, res) => {
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
});

router.post('/', productsMiddleware, async (req, res) => {
  try {
    const response = await productsService.postProduct(req.body);
    return res.status(response.status).json(response.resp);
  } catch (err) {
    return err.message;
  }
});

router.put('/', productsMiddleware, async (__req, __res) => {
  /* return res.status(200).json({ message: 'ok' }); */
});

module.exports = router;
