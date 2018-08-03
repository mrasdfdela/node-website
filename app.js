var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    serveStatic = require('serve-static'),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");

// Routes
var recipeRoutes    = require("./routes/recipes");
var indexRoutes     = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(serveStatic(__dirname + "/img"));
app.use(methodOverride("_method"));

// Mongo DB Connection
// mongoose.connect("mongodb://localhost/jerrysBlog");
// mongoose.connect("mongodb://mrasdfdela:q1w2e3r4@ds253871.mlab.com:53871/jerryswebpage_v2");
var url = process.env.DATABASEURL || "mongodb://localhost/jerrysBlog";
mongoose.connect(url);

// Passport Configuration
app.use(require("express-session")({
    secret: "This is Jerry's House",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// User Schema Setup

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);

app.get('/*',function(req, res){ res.render("../error") });

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Jerry's v2 Website Server Has Started!");
});