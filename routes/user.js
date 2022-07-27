const passport = require("passport");
const bcrypt = require("bcrypt");
const moment = require('moment');
const express = require("express");
const router = express.Router();

const database = require("../scripts/mysqlConnection");
const appError = require("../scripts/AppError");
const users = require("../scripts/users");
const money = require("../scripts/money");
const validationMiddleware = require("../scripts/validation");

// sing up page
router.get("/sing-up", function(req, res){
    res.render("user/singUp", {error: req.flash('signupMessage')});
});

// sing up
router.post("/sing-up", validationMiddleware.validateSignUp, passport.authenticate('local-signup', {failureRedirect: "/sing-up"}), function(req, res){
    res.redirect("/");
});

// log in page
router.get("/log-in", function(req, res){
    res.render("user/login", {error: req.flash('loginMessage')});
});

// log in
router.post("/log-in", validationMiddleware.validateLogIn, passport.authenticate("local-login", {successRedirect: "/items", failureRedirect: "/log-in"}), function(req, res){

});

// log out
router.get("/logout", users.LoggedIn, function(req, res){
    req.logOut();
    res.redirect("/items");
});

// update username
router.put("/account/username", users.LoggedIn, function(req, res, next){
    database.query("UPDATE users SET ? WHERE id = ?", [{username: req.body.username} ,req.user.id], function(err, user, fields){
        if(err) next(err);
        res.redirect("/account");
    });
});

// update Email
router.put("/account/email", users.LoggedIn, function(req, res, next){
    database.query("SELECT * FROM users WHERE email = ?", [req.body.email], function(err, user, fields){
        if(err) next(err);
        if(user.length === 0){
            database.query("UPDATE users SET ? WHERE id = ?", [{email: req.body.email} ,req.user.id], function(err, user, fields){
                res.redirect("/account");
            });
        }

        res.redirect("/account");
    });
});

// update Phone Number
router.put("/account/phoneNumber", users.LoggedIn, function(req, res, next){
    if(err) next(err);
    database.query("UPDATE users SET ? WHERE id = ?", [{phoneNumber: req.body.phoneNumber} ,req.user.id], function(err, user, fields){
        res.redirect("/account");
    });
});

// Forgot Password
router.get("/account/password", users.LoggedIn, function(req, res){
    res.render("user/password");
});

// Change Password
router.put("/account/password", users.LoggedIn, function(req, res, next){
    bcrypt.hash(req.body.user_password, 12, (err, hash) => {
        if(err) next(err);
        database.query("UPDATE users SET ? WHERE id = ?", [{user_password: hash} ,req.user.id], function(err, user, fields){
            if(err) next(err);
            res.redirect("/account");
        });
    });
});

// Account
router.get("/account", users.LoggedIn, function(req, res, next){
    if(users.isItemAdmin(req)) {
        var query = "SELECT * FROM items WHERE true";
        
        var superadmin = users.isSuperAdmin(req);
        var coin = users.isCoinAdmin(req);

        if(req.query.search && req.query.search !== ""){ query += " && tags LIKE " + database.escape('%' + req.query.search + '%') + " && visible = 'true'";}
        if(req.query.type && req.query.type !== "All") {query += " && item_type = " + database.escape(req.query.type);}
        if(req.query.state && req.query.state !== "All") {query += " && mode = " + database.escape(req.query.state);}
        if(req.query.iv && req.query.iv !== "false"){query += " && visible = 'false'";}
        else {query += " && visible = 'true'";}

        database.query(query, function(err, results, fields){
            if(err) next(err);
            res.render("user/adminAccount", {user: req.user, items: results, superadmin: superadmin, coin: coin});
        });
    } else {
        res.render("user/account", {user: req.user});
    }
});

// Account Master
router.get("/accountMaster", users.SuperAdmin, function(req, res, next){
    if(req.query.search && req.query.search !== "") {
        database.query("SELECT * FROM users WHERE email LIKE '" + req.query.search + "%'", function(err, user, fields){
            if(err) next(err);
            res.render("user/accountMaster", {user, users});
        });
    } else {
        database.query("SELECT * FROM users ORDER BY username", function(err, user, fields){
            if(err) next(err);
            res.render("user/accountMaster", {user, users});
        });
    }
});

router.post("/accountMaster/password", users.SuperAdmin, function(req, res){
    res.render("user/passwordMaster", {name: req.body.name, email: req.body.email});
});

// Change Password of user
router.put("/accountMaster/password", users.SuperAdmin, function(req, res, next){
    bcrypt.hash(req.body.user_password, 12, (err, hash) => {
        if(err) next(err);
        database.query("UPDATE users SET ? WHERE email = ?", [{user_password: hash}, req.body.email], function(err, user, fields){
            if(err) next(err);
            res.redirect("/accountMaster");
        });
    });
});

router.post("/accountMaster/disable", users.SuperAdmin, function(req, res){
    if(users.disabled.indexOf(req.body.id.toString()) === -1){
        users.disabled.push(req.body.id);
    } else {
        users.disabled.splice(users.disabled.indexOf(req.body.id), 1);
    }

    res.redirect("/accountMaster");
});

// delete confirm
router.get("/deleteConfirm", users.SuperAdmin, function(req, res, next){
    database.query("SELECT * FROM items WHERE visible = 'delete'", function(err, items, fields){
        if(err) next(err);
        res.render("user/deleteConfirm", {items: items});
    });
});

// Money Converter
router.get("/Money-Converter", users.CoinAdmin, function(req, res){
    res.render("user/moneyConverter", {IQD: money.IQD});
});

// USD
router.post("/USD", users.CoinAdmin, (req, res) => {
    if(req.body.usd && parseFloat(req.body.usd) > 100000){
        money.IQD = parseFloat(req.body.usd) / 100;
    }

    res.redirect('back');
});

// async function IQD (req, res, next) {
//     if(new Date(money.date).getDate() < new Date(Date.now()).getDate()) {
//         await money.revalue();
//     }

//     next();
// }

module.exports = router;