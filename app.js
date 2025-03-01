const path = require('path');
const express = require('express');
const app = express();

// Middleware for parsing JSON & URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets (CSS, JS, images)
app.use('/assets', express.static(path.join(__dirname, '372OnlineStore', 'assets')));

// Define Routes for Public View Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'productList.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'cart.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'order-history.html'));
});

app.get('/products/details', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'productDetails.html'));
});

// Admin Pages (Not for Public View)
app.get('/admin/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'admin-upload.html'));
});

app.get('/admin/products', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'admin-products.html'));
});

app.get('/admin/edit-product', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'product-edit.html'));
});

app.get('/admin/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'admin-edit.html'));
});

app.get('/products/details', (req, res) => {
  res.sendFile(path.join(__dirname, '372OnlineStore', 'views', 'productDetails.html'));
});


//  Import API Routes (For Future Backend Functionality)
const shopRoutes = require('./372OnlineStore/routes/shop');
const adminRoutes = require('./372OnlineStore/routes/admin');
const cartRoutes = require('./372OnlineStore/routes/cart');
const orderRoutes = require('./372OnlineStore/routes/order');

// Use API Routes
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
