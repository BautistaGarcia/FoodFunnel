// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { log } = require("console");

const products = path.join(__dirname,"../data/productsDataBase.json");

const mainController = {
    
    allProducts: (req, res) => {
        const products = JSON.parse(fs.readFileSync(products, 'utf-8'));
        res.render("allProducts.ejs", {products})
    },

    productDetail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(products, 'utf-8'));
        let productId = req.params.id
        let definedProduct = products.find(product => {
            return  product.id == productId; 
        })

        if(definedProduct){
            res.render("productDetail.ejs")
        } else {
            res.send("404Found.ejs")
        }
    },

    create: (req, res) => {

        res.render("allProducts.ejs")
    },

    processCreate: (req, res) => {
        res.render("allProducts.ejs")
    },

    edit: (req, res) => {
        res.render("allProducts.ejs")
    },

    processEdit: (req, res) => {
        res.render("allProducts.ejs")
    },

    destroy: (req, res) => {
        res.render("allProducts.ejs")
    }

}

module.exports = mainController;