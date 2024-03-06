// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { log } = require("console");



const mainController = {

    index: (req, res) => {
        res.render("index.ejs")
    },

}

module.exports = mainController;