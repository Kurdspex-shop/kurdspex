const moment = require('moment');
const express = require("express");
const router = express.Router();

const database = require("../scripts/mysqlConnection");
const appError = require("../scripts/AppError");
const users = require("../scripts/users");
var validationMiddleware = require("../scripts/validation");

router.get("/account/coinMaster", users.CoinAdmin, function(req, res, next){
    if(req.query.search && req.query.search !== "") {
        database.query("SELECT * FROM users WHERE email LIKE '" + req.query.search + "%'", function(err, user, fields){
            if(err) next(err);
            if(user.length === 0) return next(new appError(req.query.search + ' not found' ,400));
            res.render("coin/coinMaster", {user: user});
        });
    } else {
        database.query("SELECT * FROM users ORDER BY username", function(err, user, fields){
            if(err) next(err);
            res.render("coin/coinMaster", {user: user});
        });
    }
});

router.put("/account/coinMaster/coin", users.CoinAdmin, function(req, res, next){
    database.query("SELECT * FROM users WHERE id = ?", [req.body.id], function(err, user, fields){
        if(err) next(err);

        user[0].coin += parseInt(req.body.coin);

        database.query("UPDATE users SET ? WHERE id = ?", [user[0], user[0].id], function(err, user, fields){
            res.redirect("/account/coinMaster");
        });
    });
});

// coin items
router.get("/coinItems", function(req, res){
    let admin = users.isCoinAdmin(req);
    let coin = (req.isAuthenticated()) ? req.user.coin : undefined;

    database.query("SELECT * FROM coin_items", function(err, items, fields){
        res.render("coin/items", {items: items, admin: admin, coin: coin});
    });
});

// new item
router.get("/coinItems/new", users.CoinAdmin, function(req, res){
    res.render("coin/new");
});

// create item
router.post("/coinItems", users.CoinAdmin, validationMiddleware.validateCoin, function(req, res, next){
    database.query("INSERT INTO coin_items SET ?", [req.body.coin], function(err, item, fields){
        if(err) next(err);
        res.redirect("/coinItems");
    });
});

// show item
router.get("/coinItems/:id", function(req, res, next){
    let admin = users.isItemAdmin(req);
    database.query("SELECT * FROM coin_items WHERE id = ?", [req.params.id], function(err, item, fields){
        if(err) next(err);
        if(item.length === 0) return next(new appError('item not found', 400));
        res.render("coin/show", {item: item[0], admin: admin, lang: req.cookies.language});
    });
});

// edit item
router.get("/coinItems/:id/edit", users.CoinAdmin, function(req, res, next){
    database.query("SELECT * FROM coin_items WHERE id = ?", [req.params.id], function(err, item, fields){
        if(item.length === 0) return next(new appError('item not found', 400));
        res.render("coin/edit", {item: item[0]});
    });
});

//update item 
router.put("/coinItems/:id", users.CoinAdmin, validationMiddleware.validateCoin, function(req, res, next){
    database.query("UPDATE coin_items SET ? WHERE id = ?", [req.body.coin, req.params.id], function(err, item, fields){
        if(err) next(err);
        res.redirect("/coinItems/" + req.params.id);
    });
});

// delete item
router.delete("/coinItems/:id", users.CoinAdmin, function(req, res, next){
    database.query("DELETE FROM coin_items WHERE id = ?", [req.params.id], function(err, item, fields){
        if(err) next(err);
        res.redirect("/coinItems");
    });
});

module.exports = router;