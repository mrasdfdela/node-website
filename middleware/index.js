var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You must be logged in to access that page")
    }
    res.redirect("/login");
}

module.exports = middlewareObj