function userLoggedMiddleware(req, res, next) {
    res.locals.userIsLogged = false;
    res.locals.userIsAmin = false;
    if (req.session.userLoggedIn && req.session.userLoggedIn.user_type === 2) {
        console.log("common user logged in: " + req.session.user_type)

        res.locals.userIsLogged = true;
        res.locals.userIsLogged = req.session.userLoggedIn
    } else if (req.session.userLoggedIn && req.session.userLoggedIn.user_type === 1) {
        console.log("admin loggued in: " + req.session.userLoggedIn.email)

        res.locals.userIsLogged = true;
        res.locals.userIsAmin = true;
        res.locals.userIsLogged = req.session.userLoggedIn
    }

    next();
}
module.exports = userLoggedMiddleware;