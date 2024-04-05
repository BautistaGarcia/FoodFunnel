// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');

const authMiddleware = require("../middlewares/authMiddleware")
const productsController = require("../controllers/productsController");

router.get('/productDetail/:id', productsController.productDetail);

router.get('/all', productsController.allProducts);

// Buscar un producto
router.get('/search', productsController.search);

router.get('/create',authMiddleware.admin , productsController.create);
router.post('/create', productsController.processCreate);

router.get('/edit/:id',authMiddleware.admin, productsController.edit);
router.post('/edit/:id', productsController.processEdit);

router.delete('/destroy/:id',authMiddleware.admin , productsController.destroy);

router.get('/category/:name', productsController.category);

router.get('/restaurants', productsController.restaurants);

router.get('/order', productsController.order);

module.exports = router;