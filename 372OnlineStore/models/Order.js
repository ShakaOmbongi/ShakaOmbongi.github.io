const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Additional fields (e.g., userId, shippingAddress) can be added
});

module.exports = Order;
