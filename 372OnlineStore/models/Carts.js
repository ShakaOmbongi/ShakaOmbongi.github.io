const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // You could include a userId, status, etc.
});

module.exports = Cart;
