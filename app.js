var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    serveStatic = require('serve-static');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(serveStatic(__dirname + "/img"));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/hiking", function(req, res) {
    res.render("hiking/hiking");
});

app.get("/contact", function(req,res){
   res.render("contact"); 
});

app.get('/*',function(req, res)
{
    res.send("This page in under construction. Hopefully. =/");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Jerry's Website Server Has Started!");
});