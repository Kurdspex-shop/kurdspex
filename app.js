const url = require('url');
const sanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const passport = require("passport");
const passportConfig = require('./scripts/mysqlPassport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const path = require("path");
const helmet = require("helmet");
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const express = require("express");

const itemRoutes = require("./routes/item");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const economyRoutes = require("./routes/economy");
const coinRoutes = require("./routes/coin");

const app = express();

passportConfig(passport);
var sessionStore = new MySQLStore({}, require('./scripts/mysqlConnection'));

app.use(require("express-session")({
    secret: 'a>+]5]Ue*eE.MZ\cfPV.Tz*wa{zS3Le$%C5cXk#8Dk*sJ!ffF)uzSZ2X)q+VBSF79@!knFZ\jg`CA*\%WJ6mQ>JqV',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(sanitizer());
app.use(methodOverride("_method"));
app.use(flash());
app.use(cookieParser());
app.use(helmet());
app.use(require('./scripts/contentSecurityPolicy'));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.webUrl = url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/items", itemRoutes);
app.use("/economy", economyRoutes);
app.use(coinRoutes);
app.use(userRoutes);
app.use(indexRoutes);

app.use(function(err, req, res, next){
    if(process.env.NODE_ENV !== 'production') console.log(err);
    const {status = 500, message = "error"} = err;
    res.render("error", {status, message});
});

const port = process.env.PORT || 5000;

app.listen(port, process.env.IP, function(){
    console.log("the server started");
});