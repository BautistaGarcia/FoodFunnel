// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const {validationResult} = require("express-validator")
const usuarios = path.join(__dirname, "../data/usersDataBase.json")
const bcrypt = require('bcryptjs')


const usersController = {
    
    order: (req, res) => {
        res.render("order.ejs")
    },
    
    register: (req, res) => {
        
        res.render("register")
    },
    
    processToRegister: (req, res) => {
        
        users = JSON.parse(fs.readFileSync(usuarios, 'utf-8'));
        const errores = validationResult(req);  //--->Traemos las validaciones

        if (!errores.isEmpty()) {//-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
            // console.log("Errores: ", errores);
            return res.render("register", { errores: errores.array(), old: req.body })
        } else {
            let createUser = {
                
                id: users[users.length - 1].id + 1,
                first_name: req.body.name,      //-->Los nombres de los campos tienen que ser iguales a los nombres del modelo 'Usuario' de DB
                full_name: req.body.full_name,
                e_mail: req.body.email,
                password: req.body.password,
                image: req.file == undefined ? "alvaro.jpg" : req.file.filename,    //--> Acá guardamos el NOMBRE del archivo en la BD, y después se renderiza la ruta completa con EJS
                registered_date: Date.now(),    //--> Esta función trae la fecha actual

                user_type_id: 2,    //--> En este caso el Id debería ser siempre '2', porque es el que corresponde a 'common_user'
                //--Definir cómo vamos a crear el usuario 'admin', que debería ser creado una sola vez.
            }
                users.push(createUser)

                fs.writeFileSync(users, JSON.stringify(users, null, ' '));
                // mostrar lo que se guardo en una vista
                console.log("aca esta el error")

                console.log("usuario a crear: ", createUser);  //--> Muestra por consola cómo quedó el registro que se inserta en la BD
            res.redirect('login')  //--> Una vez creado el registro en la DB. se redirige a la página de logueo
        }
    },

    login: (req, res) => {
        res.render("login.ejs")
    },

    processToLogin: (req, res) => {
        const userToLog = {
            email: req.body.email,
            password: req.body.password,
        }

        res.redirect("/", { userToLog })
    },

    userProfile: (req, res) => {
        res.render("userProfile.ejs")
    },

    logOut: (req, res) => {
        res.render("logOut.ejs")
    },

    editUser: (req, res) => {
        res.render("userProfile.ejs")
    },

    destroy: (req, res) => {
        res.render("userProfile.ejs")
    },


}

module.exports = usersController;