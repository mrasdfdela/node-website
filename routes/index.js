var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    bodyParser  = require("body-parser"),
    User        = require("../models/user"),
    middleware  = require("../middleware"),
    device      = require("express-device");

router.use(bodyParser.urlencoded({extended: true}));
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

router.use(device.capture());
device.enableDeviceHelpers(router);
device.enableViewRouting(router);

router.get("/", function(req, res){  res.render("index")  });
router.get("/journal", middleware.isLoggedIn, function(req,res){  res.render("journal")  });
router.get("/contact", function(req,res){  res.render("contact")  });
router.get("/hiking", middleware.isLoggedIn, function(req, res){  res.render("hiking")  });

router.get("/cycling", function(req, res){  res.render("cycling")  });
router.get("/tipcalculator", function(req, res){  
    // var deviceType = req.device.type;
    console.log(req.device.type)
    res.render("tipCalculator", {deviceType: req.device.type});
});
 
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
    function(req, res){
        passport.authenticate(
            "local",
            {
                failureRedirect: "/login", 
                failureFlash: "Please re-enter your credentials"
            }
        )(req, res, function(){
            req.flash("success", "Welcome, "+req.user.username+"!");
            res.redirect("/")
        });
    }
)

router.get("/logout", function(req, res){
    req.flash("success", "You have been logged out")
    req.logout();
    res.redirect("/")
});

module.exports = router;