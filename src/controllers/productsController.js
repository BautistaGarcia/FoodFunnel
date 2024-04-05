// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = require("../data/database/models");
const { log } = require("console");
const { Op, where } = require("sequelize");
//-->  const productsJSON = path.join(__dirname, "../data/productsDataBase.json");

const productsController = {

    productDetail: async (req, res) => {
        try {
            let products = await db.Products.findByPk(req.params.id, {
                include: [
                    // con el association se utiliza primero el tableName del modelo y luego el attributo o campo donde esta el nombre x ejemplo
                    { association: "state", attributes: ["location"] },
                    { association: "brand", attributes: ["brand_name"] },
                ],
            });

            res.render("productDetail.ejs", {products});
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    create: async (req, res) => {
        try {
            //--> Se traen todas las características que se obtengan desde otras tablas a través de las relaciones
            let availablebrands = await db.Brands.findAll();
            let availableCategorys = await db.Categorys.findAll();
            let availableStates = await db.States.findAll();


            res.render("productCreate.ejs", {
                availablebrands,
                availableCategorys,
                availableStates,
            });
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    processCreate: async (req, res) => {
        try {

            let product_brand = await db.Brands.findOne({
                where: {
                    id: req.body.brand,
                },
            });

            let product_category = await db.Categorys.findOne({
                where: {
                    id: req.body.category,
                },
            });

            let product_state = await db.States.findOne({
                where: {
                    id: req.body.state,
                },
            });

            let product_address = await db.Address.findOne({
                where: {
                    id: req.body.address,
                },
            });

            const newProduct = await db.Products.create({
                name:
                    req.body.name == undefined
                        ? "Unassigned"
                        : req.body.name,
                description:
                    req.body.description == undefined
                        ? "Unassigned"
                        : req.body.description,
                image:
                    req.file == undefined
                        ? "IMG_DEFAULT.jpg"
                        : req.file.filename,
                quantity:
                    req.body.quantity == undefined
                        ? 0
                        : req.body.quantity,
                price:
                    req.body.price == undefined
                        ? 0
                        : req.body.price,
                discount:
                    req.body.discount == undefined
                        ? 0
                        : req.body.discount,
                brand:
                    req.body.brand == undefined
                        ? "Unassigned"
                        : product_brand.id,
                state:
                    req.body.state == undefined
                        ? "Unassigned"
                        : product_state.id,
                address:
                    req.body.address == undefined
                        ? "Unassigned"
                        : product_address.id,
                category:
                    req.body.category == undefined
                        ? "Unassigned"
                        : product_category.id,
            });

            res.redirect("productDetail/" + newProduct.id)
        } catch (err) {
            res.render("404Found.ejs")
        }
    },

    edit: async (req, res) => {
        try {
            let productToEdit = await db.Products.findByPk(req.params.id, {
                include: [
                    { association: "brand", attributes: ["brand_name"] },
                    { association: "category" },
                    { association: "state" },
                    { model: db.Address },
                ],
            });

            let availablebrands = await db.Brands.findAll();
            let availableCategorys = await db.Categorys.findAll();
            let availableStates = await db.States.findAll();

            res.render("allProducts.ejs", {
                productToEdit,
                availablebrands,
                availableCategorys,
                availableStates
            })
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    processEdit: async (req, res) => {
        try {
            let editedProduct = await db.Productos.update({
                image:
                    req.file == undefined
                        ? "IMG_DEFAULT.jpg"
                        : req.file.filename,
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                discount: req.body.discount,
                brand: req.body.brand,
                address: req.body.address,
                category: req.body.category,
            },
                {
                    where: {
                        id: req.params.id,
                    },
                });

            res.redirect("productDetail/" + req.params.id)
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    destroy: async (req, res) => {
        try {
            let products = await db.Products.destroy({
                where: {
                    id: req.params.id,
                },
            });

            res.render("allProducts.ejs")
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    search: async (req, res) => {
        try {
            let productsSearch = await db.Products.findAll();
            res.render("search.ejs", { productsSearch })
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    allProducts: async (req, res) => {
        try {
            let products = await db.Products.findAll();
            res.render("allProducts.ejs", { products })
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    category: async (req, res) => {
        try {
            let category = await db.Products.findAll({
                where: {
                    "$category.category_name$": req.params.name
                    // para acceder a la propiedad de una tabla relacionada a productos hacen falta escribir la clave en string y entre dos signos $ aca va la clave $
                },
                include: [{ association: "category", attributes: ["category_name"] }],
            });
            res.render("productCategory.ejs", { category });
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    restaurants: async (req, res) => {
        try {
            let products = await db.Products.findAll();
            let offerts = await db.Products.findAll({
                where: {
                    discount: {
                        [Op.ne]: 0,
                    }
                }
            });
            let mcDonaldsProducts = await db.Products.findAll({
                where: {
                    brand_id: {
                        [Op.eq]: 1,
                    }
                }
            });
            let tomassoProducts = await db.Products.findAll({
                where: {
                    brand_id: {
                        [Op.eq]: 2,
                    }
                }
            });
            let deanAndDennisProducts = await db.Products.findAll({
                where: {
                    brand_id: {
                        [Op.eq]: 3,
                    }
                }
            });
            let shawarmiProducts = await db.Products.findAll({
                where: {
                    brand_id: {
                        [Op.eq]: 4,
                    }
                }
            });

            res.render("restaurants", { products, offerts, mcDonaldsProducts, tomassoProducts, deanAndDennisProducts, shawarmiProducts })
        } catch (err) {
            console.log(err)
            res.render("404Found");
        }
    },

    order: async (req, res) => {
        try {
            res.render("order.ejs");
        } catch (err) {
            res.render("404Found.ejs");
        }
    },

    /*              CRUD JSON             
    
    
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

                        search: (req, res) => {
                            const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));
                            res.render("search.ejs", { productsSearch: products })
                        },

                            allProducts: (req, res) => {
                                const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));
                                res.render("allProducts.ejs", { products })
                            },

                                category: (req, res) => {
                                    const products = JSON.parse(fs.readFileSync(productsJSON, 'utf-8'));

                                    var filteredProducts = products.filter(function (product) {
                                        return product.category === req.params.category;
                                    });
                                    
                                    res.render("productCategory.ejs", { filteredProducts })
                                },
                                
                                order: (req, res) => {
                                        res.render("order.ejs")
                                    },

                                    CRUD JSON */
}

module.exports = productsController;