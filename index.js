var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config.js')[env];

require('./server/config/express.js')(app, config);

require('./server/config/mongoose.js')(config);

require('./server/config/passport.js')();

require('./server/config/routes.js')(app);

app.listen(config.port);
console.log('Listening to port ' + config.port + '...');