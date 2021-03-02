const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  _id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = Cart;