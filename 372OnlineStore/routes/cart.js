const express = require('express');
const path = require('path');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Serve the shopping cart page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cart.html'));
});

// Fetch cart items (JSON response)
router.get('/api', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.post('/update', cartController.updateCartItem);

// Remove item from cart
router.post('/remove/:productId', cartController.removeFromCart);

module.exports = router;
