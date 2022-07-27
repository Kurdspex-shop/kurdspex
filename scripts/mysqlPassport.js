var LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var database = require("./mysqlConnection")	

module.exports = function(passport) {

    // ========== passport session setup ==========

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		database.query("select * from users where id = ?", [id], function(err, user){	
			done(err, user[0]);
		});
    });
	
    // ========== LOCAL SIGNUP ==========

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'user_password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, user_password, done) {
		// find a user whose email is the same as the forms email we are checking to see if the user trying to login already exists
        database.query("select * from users where email = ?", [email], function(err, user){
			if (err)
                return done(err);
			 if (user.length) {
                return done(null, false, req.flash('signupMessage', '(' + email + ') is already taken'));
            } else {
                bcrypt.hash(user_password, 12, function(err, hash) {
                    var newUser = {
                        email: email,
                        user_password: hash,
                        phoneNumber: req.body.phoneNumber,
                        username: req.body.username
                    }
                
                    database.query("INSERT INTO users SET ?", [newUser], function(err, user){
                        newUser.id = user.insertId;
                        return done(null, newUser);
                    });	
                });
            }
		});
    }));

    // ========== LOCAL LOGIN ==========

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'user_password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, user_password, done) { // callback with email and password from our form

        database.query("SELECT * FROM users WHERE email = ?", [email], function(err, user){
			if (err)
                return done(err);
			if (!user.length) {
                return done(null, false, req.flash('loginMessage', 'Your email or password is wrong')); // req.flash is the way to set flashdata using connect-flash
            } 
			
            bcrypt.compare(user_password, user[0].user_password, function(err, result) {
                // if the user is found but the password is wrong
                if (!result)
                return done(null, false, req.flash('loginMessage', 'Your email or password is wrong')); // create the loginMessage and save it to session as flashdata
                
                // all is well, return successful user
                return done(null, user[0]);			
            });
		});
    }));
};