var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!'},
    password: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPass(this.salt, passwordToMatch) === this.password;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPass(salt, 'andre');
            User.create({ firstName: 'Andreea', lastName: 'Stan', username: 'andre', salt: salt, password: hash, roles: [] });
            salt = encrypt.createSalt();
            hash = encrypt.hashPass(salt, 'admin');
            User.create({ firstName: 'SP', lastName: 'Admin', username: 'sp_admin', salt: salt, password: hash, roles: ['admin'] });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;