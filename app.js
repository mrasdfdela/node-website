var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    serveStatic = require('serve-static'),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override");

// Routes
var indexRoutes = require("./routes/index.js")

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(serveStatic(__dirname + "/img"));

// mongoose.connect("mongodb://mrasdfdela:q1w2e3r4@ds253871.mlab.com:53871/jerryswebpage_v2");
mongoose.connect(process.env.DATABASEURL);

app.get("/journal", function(req,res){  res.render("journal")  });
app.get("/contact", function(req,res){  res.render("contact")  });
app.get("/hiking", function(req, res){  res.render("hiking")  });

// app.get("/login", function(req,res){
//     res.render("login");
// })

// Travel Schemas & Routes
var recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
});
var Recipe = mongoose.model("Recipe", recipeSchema);

// Index
app.get("/recipes", function(req, res){
    Recipe.find({}, function(err, recipes){
        if(err){
            res.redirect("/*")
        } else {
            res.render("./recipes/recipes", {recipes: recipes})
        }
    })
});

// New
app.get("/recipes/new", function(req, res){
    res.render("./recipes/new")
});

// Create
app.post("/recipes", function(req, res){
    Recipe.create(req.body.newRecipe, function(err, newRecipe){
        if(err){
            res.redirect("/*")
        } else {
            res.redirect("recipes")
        }
    })
})

// SHOW
app.get("/recipes/:id", function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            res.redirect("/recipes");
        } else {
            res.render("./recipes/show",{recipe: recipe})
        }
    })
})
// EDIT
app.get("/recipes/:id/edit", function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            res.redirect("/*")
        } else {
            res.render("recipes/edit",{recipe: recipe})
        }
    });
})
// UPDATE
app.put("/recipes/:id", function(req, res){
    Recipe.findByIdAndUpdate(req.params.id, req.body.editedRecipe, function(err, editedRecipe){
        if(err){
            res.redirect("/*")
        } else {
            res.redirect("/recipes/"+req.params.id)
        }
    })
})
// Destroy
app.delete("/recipes/:id", function(req, res){
    Recipe.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/*");
        } else {
            res.redirect("/recipes")
        }
        
    })
})

app.use("/", indexRoutes);

app.get('/*',function(req, res){ res.render("../error") });

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Jerry's v2 Website Server Has Started!");
});