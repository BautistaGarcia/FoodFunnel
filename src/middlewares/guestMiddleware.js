function guestMiddleware(req, res, next){
    if (req.session.userLoggedIN) {
        console.log("user is logged")
        return res.redirect(`/users/userProfile/${req.session.userLoggedIn.id}`)
    } else {
        console.log("user is not logged but still can see the view")
        next()
    }
}

module.exports = guestMiddleware;