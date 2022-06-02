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
  return null;
})

router.put('/', salesMiddleware, async (req, res) => {
  return null;
})

router.put('/:id', salesMiddleware, async (req, res) => {
  return null;
})

module.exports = router;
