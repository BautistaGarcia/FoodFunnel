// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get('/', mainController.index);

router.get('/order', mainController.order);

module.exports = router;