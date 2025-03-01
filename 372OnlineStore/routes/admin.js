const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');

router.get('/products', productController.getAdminProducts);
router.post('/add-product', productController.addProduct);
router.post('/upload', adminController.uploadProducts);
router.post('/edit-product', adminController.editProduct);

module.exports = router;
