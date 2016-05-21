var mongoose = require('mongoose'),
    userModel = require('../models/User.js');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('restaurant db opened');
    });

   userModel.createDefaultUsers();
}
