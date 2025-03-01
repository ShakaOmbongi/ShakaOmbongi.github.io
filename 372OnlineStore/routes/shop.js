const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/product/:id', productController.getProduct);

module.exports = router;
