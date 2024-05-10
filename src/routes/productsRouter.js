// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');

const authMiddleware = require("../middlewares/authMiddleware")
const productsController = require("../controllers/productsController");
const lastSeenMiddlewares = require('../middlewares/productSeen.js'); 


router.get('/productDetail/:id', lastSeenMiddlewares , productsController.productDetail);

router.get('/all', productsController.allProducts);

// Buscar un producto
router.get('/search', productsController.search);
//

router.get('/create', productsController.create);
router.post('/create', productsController.processCreate);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.processEdit);

router.delete('/destroy/:id', productsController.destroy);

router.get('/category/:name', productsController.category);

router.get('/restaurants', productsController.restaurants);

router.get('/order', productsController.order);

module.exports = router;