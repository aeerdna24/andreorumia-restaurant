var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
}

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.password = encrypt.hashPass(userData.salt, userData.password);
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
}

exports.updateUser = function (req, res, next) {
    var user = req.body;
    if (req.user._id != user._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = user.firstName;
    req.user.lastName = user.lastName;
    req.user.username = user.username;
    if (user.password && user.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.password = encrypt.hashPass(req.user.salt, user.password);
    }
    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.user);
    });
}