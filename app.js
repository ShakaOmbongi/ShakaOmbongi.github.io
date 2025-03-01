const express = require('express');
const path = require('path');
const app = express();

// Load environment variables if needed (make sure to require dotenv in your config if using .env)
// require('dotenv').config();

// Import the database configuration
const sequelize = require('./372OnlineStore/config/database');

// Import routes using the correct relative paths
const shopRoutes = require('./372OnlineStore/routes/shop');
const adminRoutes = require('./372OnlineStore/routes/admin');
const cartRoutes = require('./372OnlineStore/routes/cart');
const orderRoutes = require('./372OnlineStore/routes/order');

// Parse URL-encoded bodies and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use('/', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("Database sync error:", err));
