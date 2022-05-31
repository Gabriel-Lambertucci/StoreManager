const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService');


router.get('/', async (req, res) => {
  try {
    const [rows] = await productsService.getAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({message: 'erro productsController'});
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productsService.getAll(id);
    console.log(response);
    res.status(200).json(response[0][0]);
  } catch (err) {
    res.status(500).json({message: 'erro productsController'});
  }
})

module.exports = router;