const express = require('express');

const router = express.Router();

const salesService = require('../services/salesSevice');
const salesMiddleware = require('../middlewares/salesMiddleware');

router.get('/', async (req, res) => {
  try {
    const [rows] = await salesService.getAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'erro salesController' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await salesService.getAll(id);
    if (response[0].length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(response[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

router.post('/', salesMiddleware, async (req, res) => {
  let idPromises = [];
  try {
      idPromises = req.body.map(async (item) => {
        const { productId, quantity } = item;
        const response = await salesService.postSale(productId, quantity);
        return response;
      });
      const id = await Promise.all(idPromises);
      const result = {
        id: id[0],
        itemsSold: req.body,
      };
      res.status(201).json(result);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', salesMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];
    await salesService.putSale(id, productId, quantity);
    const result = {
      saleId: id,
      itemUpdated: [
        {
          productId,
          quantity,
        },
      ],
    };
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
