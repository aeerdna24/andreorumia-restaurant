var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function () {
        console.log('restaurant db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        password: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPass(this.salt, passwordToMatch) === this.password;
        }
    };
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPass(salt, 'andre');
            User.create({ firstName: 'Andreea', lastName: 'Stan', username: 'andre', salt: salt, password: hash, roles: [] });
            salt = createSalt();
            hash = hashPass(salt, 'admin');
            User.create({ firstName: 'SP', lastName: 'Admin', username: 'sp_admin', salt: salt, password: hash, roles: ['admin'] });
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPass(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}