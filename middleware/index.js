console.log("Hello! This message is being displayed from the index middleware file.")
var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("You must be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj