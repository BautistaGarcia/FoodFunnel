// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get('/main', adminController.main);

router.get('/allUsers', adminController.allUsers);

router.get('/allProducts', adminController.allProducts);

router.get('/allCategories', adminController.allCategories);

router.get('/allBanners', adminController.allBanners);

router.get('/allPromotions', adminController.allPromotions);


module.exports = router;