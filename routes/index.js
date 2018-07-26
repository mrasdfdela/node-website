var express = require("express");
var router = express.Router();


router.get("/", function(req, res){
    res.render("index")
});

router.get("/login", function(req, res){
    res.render("login")
});

router.get("/tipcalculator", function(req, res){  res.render("tipCalculator")  });
router.get("/cycling", function(req, res){  res.render("cycling")  });

module.exports = router;