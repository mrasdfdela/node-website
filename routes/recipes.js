var express     = require("express"),
    router      = express.Router(),
    mongoose    = require("mongoose"),
    middleware  = require("../middleware");

// Recipe schema setup
var recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
});
var Recipe = mongoose.model("Recipe", recipeSchema);

// Index
router.get("/", middleware.isLoggedIn, function(req, res){
    Recipe.find({}, function(err, recipes){
        if(err){
            res.redirect("/*")
        } else {
            res.render("./recipes/recipes", {recipes: recipes})
        }
    })
});

// New
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("./recipes/new")
});

// Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Recipe.create(req.body.newRecipe, function(err, newRecipe){
        if(err){
            res.redirect("/*")
        } else {
            res.redirect("recipes")
        }
    })
})

// SHOW
router.get("/:id", middleware.isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            res.redirect("/");
        } else {
            res.render("recipes/show",{recipe: recipe})
        }
    })
})
// EDIT
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            res.redirect("/*")
        } else {
            res.render("recipes/edit",{recipe: recipe})
        }
    });
})
// UPDATE
router.put("/:id", middleware.isLoggedIn, function(req, res){
    Recipe.findByIdAndUpdate(req.params.id, req.body.editedRecipe, function(err, editedRecipe){
        if(err){
            res.redirect("/*")
        } else {
            res.redirect("/recipes/"+req.params.id)
        }
    })
})
// Destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Recipe.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/*");
        } else {
            res.redirect("/recipes")
        }
        
    })
})

module.exports = router;