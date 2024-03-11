// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');


const productsController = require("../controllers/productsController");

router.get('/productDetail/:id', productsController.productDetail);

router.get('/index', productsController.allProducts);

router.get('/create', productsController.create);
router.post('/create', productsController.processCreate);

router.get('/edit/:id', productsController.edit);
router.post('/edit/:id', productsController.processEdit);

router.get('/destroy', productsController.destroy);


module.exports = router;