// ************ Require's ************
// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');

const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");

const usersController = require("../controllers/usersController");

// multer storage function
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img/users/'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo con timestamp
    },
  });
  
const upload = multer({storage});
// 


// validacion del register segun lo ingresado
const registerValidations = [
    body('name').notEmpty().withMessage('Tu nombre es necesario'),
    body('lastName').notEmpty().withMessage('Tu apellido es necesario'),
    body('email').trim().notEmpty().isEmail().withMessage('Tu E-mail es necesario'),
    body('password').notEmpty().isLength({ min: 8, max: 16 }).withMessage('La contraseña debe tener entre 8 y 16 caracteres'),
    body('password').matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula'),
    body('password').matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula'),
    body('password').matches(/[!@#$%^&/_*]/).withMessage('La contraseña debe tener al menos un carácter especial (!@#$%^&*)'),
    body('confirm-password').custom((validationPassword, { req }) => {
        if (validationPassword !== req.body.password) {
            throw new Error('La contraseña no es la misma que se ingresó en el campo anterior');
        }
        return true;
    }),
];
// 

// Validacion de Login
const loginValidations = [
    check('email').notEmpty().withMessage('Ingresa tu E-mail').isEmail().withMessage('Ingresa un correo electrónico válido'),
    check('password').notEmpty().withMessage('Ingresa tu contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];


router.get('/userProfile/:id', authMiddleware.common_user, authMiddleware.profile_filter, usersController.userProfile);
router.put('/userProfile/:id', /* upload.single("imgProfile") ,*/ authMiddleware.common_user, usersController.editUser);

// Login
router.get('/login', usersController.login);
router.post('/login', loginValidations, usersController.processToLogin);

// Register

router.get('/register',usersController.register);
router.post('/register', upload.single('imgProfile'), usersController.processToRegister); //-->Se guarda la imagen a través de multer, y los datos a través de Sequelize

/* log out */

router.delete('/logOut', usersController.logOut);



// Eliminar usuario 
router.delete('/delete/:id',usersController.destroy); /* se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                    * si no, lo redirige al login) */

// Eliminar usuario 
router.delete('/delete/:id',usersController.destroy); 



module.exports = router;