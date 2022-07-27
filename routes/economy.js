const express = require("express");
const router = express.Router();

const database = require("../scripts/mysqlConnection");
const users = require("../scripts/users");
const validationMiddleware = require("../scripts/validation");
let money = require("../scripts/money");

router.get("/", users.CoinAdmin, function(req, res, next){
    database.query("SELECT * FROM records ORDER BY created DESC LIMIT 15", function(err, records, fields){
        if(err) next(err);
        res.render("economy/economy", {records: records, IQD: money.IQD});
    });
});

router.post("/", users.CoinAdmin, validationMiddleware.validateRecord, function(req, res, next){
    req.body.record.record_name = req.user.username;

    database.query("SELECT * FROM records", function(err, records, fields){
        if(err) next(err);
        if(records.length !== 0){
            records[0].total += parseInt(req.body.record.record_money);
            req.body.record.total = records[0].total;
            database.query("UPDATE records SET ? WHERE id = ?", [records[0], records[0].id]);

        } else {
            req.body.record.total = parseInt(req.body.record.record_money);
        }

        database.query("INSERT INTO records SET ?", [req.body.record], function(err, records, fields){
            if(err) next(err);
            if(req.body.record.record_type === "Item"){
                database.query("SELECT * FROM items WHERE item_name = ?", [req.body.record.record_description], function(err, item, fields){
                    item[0].quantity -= 1;

                    if(item.quantity <= 0) {
                        item[0].visible = "false";
                    }

                    database.query("UPDATE items SET ? WHERE id = ?", [item[0], item[0].id]);
                });
            }

            res.redirect("back");
        });
    });
});

router.delete("/:id", users.CoinAdmin, function(req, res, next){
    database.query("SELECT * FROM records WHERE id = ?", [req.params.id], function(err, record, fields){
        if(err) next(err);
        database.query("SELECT * FROM records", function(err, records, fields){
            if(records.length !== 0){
                records[0].total -= record[0].record_money;
                database.query("DELETE FROM records WHERE id = ?", [req.params.id]);
                database.query("UPDATE records SET ? WHERE id = ?", [records[0], records[0].id]);
                records[records.length - 1].total = records[0].total;
                database.query("UPDATE records SET ? WHERE id = ?", [records[records.length - 1], records[records.length - 1].id]);
            }
        });

        res.redirect("/economy");
    });
});

router.get("/list", users.CoinAdmin, function(req, res, next){
    var page = (req.query.page) ? req.query.page : 1;

    let query = "SELECT * FROM records WHERE record_name != ''";

    if(req.query.min && req.query.max) {query += " && created BETWEEN " + database.escape(req.query.min) + " AND " + database.escape(req.query.max)}
    if(req.query.type && req.query.type !== "All") {query += " && record_type = " + database.escape(req.query.type)}

    database.query(query + " ORDER BY created DESC", function(err, records, fields){
        if(err) next(err);
        res.render("economy/list", {records: records.slice((page * 60) - 60, 60), info: {page: page, number: records.length}, IQD: money.IQD});
    });
});

router.get("/statistics", users.CoinAdmin, function(req, res, next){
    let query = "SELECT * FROM records WHERE record_name != ''";
    if(req.query.min && req.query.max) {query += " && created BETWEEN " + database.escape(req.query.min) + " AND " + database.escape(req.query.max)}

    var statistics = {profit: 0, expenses: 0, item: 0, service: 0, card: 0, ads: 0, coin: 0, buying: 0};

    database.query(query, function(err, records, fields){
        if(err) next(err);
        records.forEach(function(record){
            if(record.record_money > 0){
                statistics.profit += record.record_money;
            } else {
                statistics.expenses += record.record_money;
            }

            if(record.record_type === "Item"){
                statistics.item += record.record_money;
            } else if(record.record_type === "Card"){
                statistics.card += record.record_money;
            } else if(record.record_type === "Services"){
                statistics.service += record.record_money;
            } else if(record.record_type === "buying"){
                statistics.buying += record.record_money;
            } else if(record.record_type === "GoogleAds"){
                statistics.ads += record.record_money;
            } else {
                statistics.coin += record.record_money;
            }
        });

        res.render("economy/statistics", {statistics: statistics, IQD: money.IQD});
    });
});

module.exports = router;