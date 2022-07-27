let superAdmin = ["1"];
let coinAdmin  = ["1", "2", "3", "5"];
let itemsAdmin = ["1", "2", "3", "5"];
let jobAdmin   = ["1", "2", "3", "5"];
let blogAdmin  = ["1", "2", "3", "5"];

let user = {
    disabled: [""],
    LoggedIn: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/log-in");
    },
    SuperAdmin: function(req, res, next) {
        if(user.isSuperAdmin(req)){
            return next();
        }
        res.redirect("/");
    },
    CoinAdmin: function(req, res, next) {
        if(user.isCoinAdmin(req)){
            return next();
        }
        res.redirect("/");
    },
    ItemAdmin: function(req, res, next) {
        if(user.isItemAdmin(req)){
            return next();
        }
        res.redirect("/");
    },
    JobAdmin: function(req, res, next) {
        if(user.isJobAdmin(req)){
            return next();
        }
        res.redirect("/");
    },
    BlogAdmin: function(req, res, next) {
        if(user.isBlogAdmin(req)){
            return next();
        }
        res.redirect("/");
    },
    isSuperAdmin: function(req) {
        return req.isAuthenticated() && superAdmin.indexOf(req.user.id.toString()) !== -1
    },
    isCoinAdmin: function(req) {
        return req.isAuthenticated() && coinAdmin.indexOf(req.user.id.toString()) !== -1 && !(user.isDisabled(req))
    },
    isItemAdmin: function(req) {
        return req.isAuthenticated() && itemsAdmin.indexOf(req.user.id.toString()) !== -1 && !(user.isDisabled(req))
    },
    isJobAdmin: function(req) {
        return req.isAuthenticated() && jobAdmin.indexOf(req.user.id.toString()) !== -1 && !(user.isDisabled(req))
    },
    isBlogAdmin: function(req) {
        return req.isAuthenticated() && blogAdmin.indexOf(req.user.id.toString()) !== -1 && !(user.isDisabled(req))
    },
    isDisabled: function(req) {
        return user.disabled.indexOf(req.user.id.toString()) !== -1
    },
    isItemAdminById: function(id) {
        return itemsAdmin.indexOf(id.toString()) !== -1
    },
    isJobAdminById: function(id) {
        return jobAdmin.indexOf(id.toString()) !== -1
    },
    isBlogAdminById: function(id) {
        return blogAdmin.indexOf(id.toString()) !== -1
    },
}

module.exports = user;