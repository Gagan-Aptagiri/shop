const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

//All paths here /admin/*
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;