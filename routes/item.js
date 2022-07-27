const express = require("express");
const router = express.Router();

const appError = require("../scripts/AppError");
const database = require("../scripts/mysqlConnection");
const users = require("../scripts/users");
const money = require("../scripts/money");
const validationMiddleware = require("../scripts/validation");

// items pgae
router.get("/", function(req, res, next){
    var page = (req.query.page) ? req.query.page : 1;

    var query = "SELECT * FROM items WHERE visible = 'true'";
    const admin = users.isCoinAdmin(req);

    if(req.query.search && req.query.search !== "") {
        query += " && tags LIKE " + database.escape('%' + req.query.search + '%');
    } else {
        if(req.query.type && req.query.type !== "All") {query += " && item_type = " + database.escape(req.query.type);}
        if(req.query.state && req.query.state !== "All") {query += " && mode = " + database.escape(req.query.state);}
        if(req.query.max && req.query.min) {query += " && price BETWEEN " + database.escape(req.query.min) + " AND " + database.escape(req.query.max);}
    }

    database.query(query + " ORDER BY rating DESC", function(err, results, fields){
        if(err) return next(err);
        res.render("item/items", {items: results.slice((page * 24) - 24, page * 24), info: {page: page, number: results.length}, admin});
    });
});

// new item
router.get("/new", users.ItemAdmin, function(req, res){
    res.render("item/new");
});

// creat item
router.post("/", users.ItemAdmin, validationMiddleware.validateItem, function(req, res, next){
    database.query("INSERT INTO items SET ?", req.body.item, function(err, redults, fields){
        if(err) return next(err);
        res.redirect("/account");
    });
});

//show item
router.get("/:id", function(req, res, next){
    var admin = users.isItemAdmin(req);

    database.query("SELECT * FROM items WHERE id = ?", [req.params.id] , function(err, results, fields){
        if(err) return next(err);
        if(results.length === 0) return next(new appError('item not found', 400));
        res.render("item/show", {item: results[0], admin: admin, IQD: money.IQD, lang: req.cookies.language});
    });
});

// edit item
router.get("/:id/edit", users.ItemAdmin, function(req, res, next){
    database.query("SELECT * FROM items WHERE id = ?", [req.params.id], function(err, item, fields){
        if(err) return next(err);
        if(item.length === 0) return next(new appError('item not found' ,400));
        res.render("item/edit", {item: item[0]});
    });
});

// update item
router.put("/:id", users.ItemAdmin, validationMiddleware.validateItem, function(req, res, next){
    // req.body.item.details = req.sanitize(req.body.item.details);

    database.query("UPDATE items SET ? WHERE id = ?", [req.body.item, req.params.id], function(err, results, fields){
        if(err) return next(err);
        res.redirect("/account");
    });
});

//send to delete conferm
router.post("/:id", users.ItemAdmin, function(req, res, next){
    var visible = {};

    database.query("SELECT * FROM items WHERE id = ?", [req.params.id], function(err, items, fields){
        if(err) return next(err);
        if(items.length === 0) return next(new appError('item not found', 400));
        visible.visible = (items[0].visible !== "delete") ? "delete" : "true";

        database.query("UPDATE items SET ? WHERE id = ?", [visible, req.params.id], function(err, results, fields){
            if(err) return next(err);
            res.redirect("/account");
        });
    });
});

// delete item
router.delete("/:id", users.SuperAdmin, function(req, res, next){
    database.query("DELETE FROM items WHERE id = ?", [req.params.id], function(err, item, fields){
        if(err) return next(err);
        res.redirect("/deleteConfirm");
    });
});

module.exports = router;