const path = require('path');
const express = require('express');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const products = adminData.products;
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
  res.render('shop', { prods: products, pageTitle: 'Welcome to our shop', path: '/' });
});

module.exports = router;