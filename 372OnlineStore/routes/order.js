const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.post('/create', orderController.createOrder);

module.exports = router;
