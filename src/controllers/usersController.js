// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const usuarios = path.join(__dirname, "../data/usersDataBase.json")


const usersController = {

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
                /* en el siguiente if estamos diciendo si dentro de usuarios hay un
                usuario con correo y el correo es estrctamente igual al que se esta
                pasando por body y ademas si la contrasena macheada y el email coinciden vamos a guardar de usuarios un usuario y break */
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
            // req.session.userLoggedIn = userToLog;
            res.redirect('userProfile/${userToLog.id}')
        } else {
            return res.render('login.ejs', { errors: errors.array(), old: req.body })
        }
    },

    // (GET) Dinamismo de los Usuarios
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
            /* params-session */
            return user.id != req.params.id;

        })

        fs.writeFileSync(usuarios, JSON.stringify(users, null, ' '));

        res.redirect("/")
    }

}




module.exports = usersController;