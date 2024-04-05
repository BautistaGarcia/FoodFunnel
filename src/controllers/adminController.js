// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const db = require("../data/database/models");
const { log } = require("console");
const { Op, where } = require("sequelize");

//--> const productsJSON = path.join(__dirname, "../data/productsDataBase.json");


const adminController = {
    
    main: async (req, res) => {        
        try {
            let products = await db.Products.findAll();

            res.render("admin", { products })
        } catch (err) {
            console.log(err)
            res.render("404Found");
        }

    },
    
    
    /*      JSON CONTROLLER
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));
        const ofertedProducts =  products.filter(product => product.discount != 0 ) 
        const restaurantProducts = products.filter(product => product.brand  ) 
        
        res.render("index.ejs", {products, ofertedProducts, restaurantProducts})
    }, 
    JSON CONTROLLER    */
}

module.exports = adminController;