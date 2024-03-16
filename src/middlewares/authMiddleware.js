// middleware de rutas para los usuarios que esten logueados

// se crea un objeto literal para ejecutar segun el tipo de usuario

const auth = {
    admin: (req, res, next) => {
        if (req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type == 1) {
            // si el usuario es admin continua la ejecucion
            next()
        } else {
            // si no retorna una redireccion al login para q se logee
            return res.redirect('/users/login')
        }
    },

    common_user: (req, res, next) => {
        if (req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type == 2) {
            console.log("admin user logued:" + req.session.userLoggedIn)
            // si el usuario es admin continua la ejecucion
            next()
        } else {
            console.log("common user logued:" + req.session.userLoggedIn)
            // si no retorna una redireccion al login para q se logee
            return res.redirect('/users/login')
        }
    },

    // Filtro de usuario, sirve para que un usuario común sólo pueda ingresar a su perfil
    profile_filter: (req, res, next) => {       //--> Si el Id del pedido HTTP es igual al Id del usuario logueado, y accede a la ruta seleccionada, continúa la ejecución del controlador de esa ruta, 
        //-- si no, lo redirige al index.--//
        if (req.params.id == req.session.userLoggedIn.id) {
            console.log("user entrying to profile");
            next()
        } else {
            console.log("user Trying to enter to other's profile");
            return res.redirect('/')
        }
    }

}

module.exports = auth;