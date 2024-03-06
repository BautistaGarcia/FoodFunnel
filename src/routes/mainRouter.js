// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');


const mainController = require("../controllers/mainController");

router.get('/', mainController.index);

module.exports = router;