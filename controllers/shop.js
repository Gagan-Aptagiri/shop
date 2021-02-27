const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "shop/product-list",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Welcome",
      path: "shop/index",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: 'shop/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "shop/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: 'shop/checkout',
    pageTitle: 'checkout'
  });
}