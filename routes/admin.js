const path = require('path');
const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
  res.render('add-product', { pageTitle : 'Adding a Product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;