var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);

require('./server/config/mongoose.js')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function (username, passport, done) {
        User.findOne({ username: username }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id }).exec(function (err, user) {
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
});

require('./server/config/routes.js')(app);

app.listen(config.port);
console.log('Listening to port ' + config.port + '...');