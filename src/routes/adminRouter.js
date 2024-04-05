// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get('/main', adminController.main);

module.exports = router;