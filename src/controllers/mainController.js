// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const db = require("../data/database/models");
const { log } = require("console");

const productsJSON = path.join(__dirname, "../data/productsDataBase.json");

const mainController = {

    index: async (req, res) => {        
        try {
            let products = await db.Products.findAll({});
            res.render("index", { products })
        }
        catch (err) {
			res.render("404Found");
        }

    },

}

/*      JSON CONTROLLER
 index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));
        const ofertedProducts =  products.filter(product => product.discount != 0 ) 
        const restaurantProducts = products.filter(product => product.brand  ) 

        res.render("index.ejs", {products, ofertedProducts, restaurantProducts})
    }, 
        JSON CONTROLLER    */

module.exports = mainController;