// src/routes/productsRoutes.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Rutas para productos
router.post('/products', productsController.createProduct);
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);

module.exports = router;
