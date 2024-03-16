// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { log } = require("console");

const productsJSON = path.join(__dirname, "../data/productsDataBase.json");

const productsController = {

    allProducts: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));
        res.render("allProducts.ejs", { products })
    },

    productDetail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));

        let productId = req.params.id
        let definedProduct = products.find(product => {
            return product.id == productId;
        })

        if (definedProduct) {
            res.render("productDetail.ejs", { products: definedProduct })
        } else {
            res.send("404Found.ejs")
        }
    },

    create: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));

        res.render("productCreate.ejs", { products })
    },

    processCreate: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));

        const newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            description: req.body.description,
            // falta la imagen
            quantity: req.body.quantity,
            price: req.body.price,
            discount: req.body.discount,
            brand: req.body.brand,
            address: req.body.address,
            category: req.body.category,
            location: req.body.location
        }

        products.push(newProduct);

        fs.writeFileSync(productsJSON, JSON.stringify(products, null, " "));

        res.redirect("/products/productDetail/" + newProduct.id)
    },

    edit: (req, res) => {
        res.render("allProducts.ejs")
    },

    processEdit: (req, res) => {
        res.render("allProducts.ejs")
    },

    destroy: (req, res) => {
        res.render("allProducts.ejs")
    },

    category: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));

        var filteredProducts = products.filter(function (product) {
            return product.category === req.params.category;
        });
        
        res.render( "productCategory", {filteredProducts} )
    },

    order: (req, res) => {
        res.render("order.ejs")
    },

}

module.exports = productsController;