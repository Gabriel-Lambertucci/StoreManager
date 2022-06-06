const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.use('/sales', salesController);

const { getFunction,
  getIdFunction,
  postFunction,
  putFunction,
  deleteFunction,
} = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

router.get('/products', getFunction);
router.get('/products/:id', getIdFunction);
router.post('/products', productsMiddleware, postFunction);
router.put('/products/:id', productsMiddleware, putFunction);
router.delete('/products/:id', deleteFunction);

module.exports = router;