var express = require("express");
var router = express.Router();

var database = require("../scripts/mysqlConnection");
var money = require("../scripts/money");

router.get("/", function(req, res){
    res.redirect("/home");
});

router.get("/home", function(req, res){
    var item = {offers: {}, newest: {}, recommend: {}};

    database.query("SELECT * FROM items WHERE discount > 0 && visible = 'true' ORDER BY rating DESC LIMIT 12", function(err, items, fields){
        item.offers = items;

        database.query("SELECT * FROM items WHERE visible = 'true' ORDER BY created_at DESC LIMIT 12", function(err, items, fields){
            item.newest = items;

            database.query("SELECT * FROM items WHERE visible = 'true' ORDER BY rating DESC LIMIT 12", function(err, items, fields){
                item.recommend = items;
                res.render("home", {item: item});
            });
        });
    });
});

router.get("/cards", function(req, res){
    res.render("cards", {IQD: money.IQD, tab: req.query.tab, lang: req.cookies.language});
});

router.get("/contact-us", function(req, res){
    res.render("contact");
});

router.post("/language", function(req, res){
    res.cookie('language', req.body.lang);
    res.send('done');
});

router.get("/*", function(req,res){
    res.send("not found");
});

module.exports = router;