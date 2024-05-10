// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../data/Database/models");

const usuarios = path.join(__dirname, "../data/usersDataBase.json")
const { log } = require("console");
const { where } = require("sequelize");

const usersController = {

    order: (req, res) => {
        res.render("order.ejs")
    },

    register: (req, res) => {

        res.render("register")
    },

    processToRegister: async (req, res) => {

        try {
            const errors = validationResult(req);  //--->Traemos las validaciones
            let validateUniqueEmailR = await db.Users.findAll({
                attributes: ["email"]
            });

            for (const user of validateUniqueEmailR) {
                if (user.dataValues.email === req.body.email) {

                    return res.render("register.ejs", {
                        errors: [{ msg: "Email is allready registered" }],
                        old: req.body,
                    });
                }
            }


            if (!errors.isEmpty()) {//-->Si existen errors, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
                // console.log("Errors: ", errors);
                return res.render("register", {
                    errors: errors.array(),
                    old: req.body
                })
            } else {
                const passwordToValidate = req.body.password;
                let createUser = await db.Users.create({

                    id: users[users.length - 1].id + 1,
                    first_name: req.body.name,      //-->Los nombres de los campos tienen que ser iguales a los nombres del modelo 'Usuario' de DB
                    email: req.body.email,
                    password: bcrypt.hashSync(passwordToValidate, 10),
                    image: req.file == undefined ? "alvaro.jpg" : req.file.filename,    //--> Acá guardamos el NOMBRE del archivo en la BD, y después se renderiza la ruta completa con EJS
                    user_type: 2,
                    registered_date: Date.now(),    //--> Esta función trae la fecha actual
                    // user_type_id: 2,    //--> En este caso el Id debería ser siempre '2', porque es el que corresponde a 'common_user'
                    //--Definir cómo vamos a crear el usuario 'admin', que debería ser creado una sola vez.

                });

                return res.redirect('login')  //--> Una vez creado el registro en la DB. se redirige a la página de logueo
            }

        } catch (err) {
            console.log(err)
            return res.send(err)
        }
    },

    login: (req, res) => {
        res.render("login.ejs")
    },

    processToLogin: async (req, res) => {

        let userToLog;
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {

                let userToFind = await db.Users.findOne({
                    where: {
                        email: req.body.email,
                    },

                    include: [
                        { association: "user_type", attributes: ["user_type"] }, //--> Vamos a buscar el tipo de usuario a través de la relación entre tablas, especificando que solo queremos el valor del tipo de usuario  
                    ],
                });

                if (req.body.email === userToFind.email) {
                    if (bcrypt.compareSync(
                        req.body.password,
                        userToFind.password
                    )) {
                        req.session.userType =
                            userToFind.user_type.user_type;
                        if (req.body.rememberMe != undefined) {
                            delete userToFind["dataValues"].password;
                            delete userToFind["_previousDataValues"].password;
                            userToLogIn = userToFind; //--> Si las contraseñas coinciden, hacemos que la variable usuario a loguearse sea igual al usuario encontrado en la DB
                            req.session.userLoggedIn = userToLogIn;
                            res.cookie("rememberMe", userToLogIn.email, {
                                maxAge: 120000,
                            });
                        } else {
                            delete userToFind["dataValues"].password; //--> Borramos el password de la variable a guardar en session, por seguridad
                            delete userToFind["_previousDataValues"].password;
                            userToLogIn = userToFind; //--> Si las contraseñas coinciden, hacemos que la variable usuario a loguearse sea igual al usuario encontrado en la DB
                            req.session.userLoggedIn = userToLogIn; //--> Si el usuario ingresó satisfactoriamente vamos a guardar sus datos en 'session' --> 'userLoggedIn'
                        }
                    }
                    res.redirect('userProfile/${userToLog.id}')
                } else {
                    return res.render("login.ejs", {
                        errors: [
                            //--> Si no coinciden las contraseñas vuelve al login con el mensaje de error.
                            { msg: "Las contraseñas no conciden" },
                        ],
                        old: req.body,
                    });
                }

                if (userToLogIn.user_type.user_type == "common_user") {
                    return res.redirect(`/users/userProfile/${userToLogIn.id}`);
                } else if (userToLogIn.user_type.user_type == "admin") {
                    return res.redirect(`/admin`);
                }
            } else {
                return res.render("login.ejs", {
                    errors: errors.array(),
                    old: req.body,
                });
            }
        } catch (err) {
            console.log(err)
            if (userToLogIn === undefined) {
                return res.render("login.ejs", {
                    errors: [
                        {
                            msg: "Email doesn't match any",
                        },
                    ],
                    old: req.body,
                });
            }
        }
    },

    // (GET) Dinamismo de los Usuarios
    userProfile: async (req, res) => {
        try {
            let user = await db.Users.findByPk(req.params.id, {
                include: [
                    { association: "user_type" },
                    { association: "country" },
                ]
            });
            return res.render("userProfile.ejs", { user })
        } catch (err) {
            console.log(err)
            return res.render("404Found.ejs");
        }
    },

    editUser: async (req, res) => {
        try {
            let userToEdit = await db.Users.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
            }, {
                where: {
                    id: req.params.id,
                },
            });
            return res.redirect(req.params.id)
        } catch (err) {
            console.log(err)
            return res.render("404Found.ejs");
        }
    },

    logOut: (req, res) => {
        res.clearCookie("rememberMe");
        req.session.destroy();
        return res.redirect("/");
    },

    destroy: async (req, res) => {
        try {
            let users = await db.Users.destroy({
                where: {
                    id: req.params.id,
                },
            });
            /* console.log("Usuario borrado"); */
            res.redirect("/admin/usersList");
        } catch (err) {
            console.log(err)
            res.render("404Found.ejs");
        }
    }


    /*       JSON DATABASE 
    
     order: (req, res) => {
        res.render("order.ejs")
    },
 
    register: (req, res) => {
 
        res.render("register")
    },
 
    processToRegister: (req, res) => {
 
        users = JSON.parse(fs.readFileSync(usuarios, 'utf-8'));
        const errors = validationResult(req);  //--->Traemos las validaciones
        const passwordToValidate = req.body.password;
        if (!errors.isEmpty()) {//-->Si existen errors, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
            // console.log("Errors: ", errors);
            return res.render("register", { errors: errors.array(), old: req.body })
        } else {
            let createUser = {
 
                id: users[users.length - 1].id + 1,
                first_name: req.body.name,      //-->Los nombres de los campos tienen que ser iguales a los nombres del modelo 'Usuario' de DB
                email: req.body.email,
                password: bcrypt.hashSync(passwordToValidate, 10),
                image: req.file == undefined ? "alvaro.jpg" : req.file.filename,    //--> Acá guardamos el NOMBRE del archivo en la BD, y después se renderiza la ruta completa con EJS
                user_type: 2,
                registered_date: Date.now(),    //--> Esta función trae la fecha actual
                // user_type_id: 2,    //--> En este caso el Id debería ser siempre '2', porque es el que corresponde a 'common_user'
                //--Definir cómo vamos a crear el usuario 'admin', que debería ser creado una sola vez.
            }
 
            users.push(createUser)
 
            fs.writeFileSync(usuarios, JSON.stringify(users, null, ' '));
            // mostrar lo que se guardo en una vista
 
            console.log("usuario a crear: ", createUser);  //--> Muestra por consola cómo quedó el registro que se inserta en la BD
            res.redirect('index')  //--> Una vez creado el registro en la DB. se redirige a la página de logueo
        }
    },
 
    login: (req, res) => {
        res.render("login.ejs")
    },
 
    processToLogin: (req, res) => {
        const errors = validationResult(req);
 
        users = JSON.parse(fs.readFileSync(usuarios, 'utf-8'));
 
        let userToLog;
 
        if (users === "") {
            users = [];
        } else {
            users = users;
        }
        if (errors.isEmpty()) {
 
            for (let user = 0; user < users.length; user++) {
                if (users[user].email === req.body.email) {
 
                    if (bcrypt.compareSync(req.body.password, users[user].password)) {
                        userToLog = users[user];
                        if (req.body.rememberMe != undefined) {
                            userToLog.password = "";
                            req.session.userLoggedIn = userToLog;
                            res.cookie('rememberMe', userToLog.email, { maxAge: 60000 })
                        } else {
                            userToLog.password = "";
                            userToLog.password = "";
                            req.session.userLoggedIn = userToLog;
                        }
 
                        break;
                    }
                }
            }
 
            if (userToLog === undefined) {
 
                res.render("login.ejs", {
                    errors: [
 
                        { msg: 'La contraseña o el correo no coinciden' }
                    ],
                    old: req.body
                });
            }
            res.redirect('userProfile/${userToLog.id}')
        } else {
            return res.render('login.ejs', { errors: errors.array(), old: req.body })
        }
    },
 
    userProfile: (req, res) => {
        users = JSON.parse(fs.readFileSync(usuarios, 'utf-8'));
        let id = req.params.id
 
        let definedUser = users.find(user => {
            return user.id == id;
 
        })
 
        if (definedUser) {
            res.render("userProfile.ejs", { user: definedUser });
 
        } else {
            res.render("register.ejs");
        }
 
    },
 
 
    logOut: (req, res) => {
        res.render("logOut.ejs")
    },
 
    editUser: (req, res) => {
        res.render("userProfile.ejs")
    },
 
    destroy: (req, res) => {
        users = JSON.parse(fs.readFileSync(usuarios, 'utf-8'));
 
        user = users.filter(user => {
            return user.id != req.params.id;
 
        })
 
        fs.writeFileSync(usuarios, JSON.stringify(users, null, ' '));
 
        res.redirect("/")
    }
    
        JSON DATABASE */

}




module.exports = usersController;