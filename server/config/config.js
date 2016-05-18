var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost/restaurant',
        port: process.env.PORT || 5050
    },
    production:{
        rootPath: rootPath,
        db: 'mongodb://andreea:12345678@ds064718.mlab.com:64718/andreorumia-restaurant',
        port: process.env.PORT || 80
    }
}