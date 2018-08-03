var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    bodyParser  = require("body-parser"),
    User        = require("../models/user"),
    middleware  = require("../middleware");

router.use(bodyParser.urlencoded({extended: true}));


router.get("/", function(req, res){  res.render("index")  });
router.get("/journal", middleware.isLoggedIn, function(req,res){  res.render("journal")  });
router.get("/contact", function(req,res){  res.render("contact")  });
router.get("/hiking", middleware.isLoggedIn, function(req, res){  res.render("hiking")  });

router.get("/tipcalculator", function(req, res){  res.render("tipCalculator")  });
router.get("/cycling", middleware.isLoggedIn, function(req, res){  res.render("cycling")  });
 
// Temporary Registration Logic
router.get("/register",function(req, res){
    res.render("register");
})
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.send("No good!")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
    })
})

// Login Logic
router.get("/login", function(req, res){
    res.render("login")
});
router.post(
    "/login",
    passport.authenticate(
        "local",
        {
            successRedirect: "recipes",
            failureRedirect: "hiking"
    }),
    function(req, res){
    }
);

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;