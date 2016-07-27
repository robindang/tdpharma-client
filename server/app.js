/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var fs = require('fs');
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }
var app = express();

var http = require('http');
var server = http.createServer(app);

// Setup development for https server. Only needed for development while connecting to production server
// var https = require('https');
// var options = {
//      key: fs.readFileSync('./server/config/develop_ssl/server.key'),
//      cert: fs.readFileSync('./server/config/develop_ssl/server.crt')
//   };
// var server = https.createServer(options, app);

// Force application to use https
app.use('*',function(req,res,next){  
	var isSecure = req.secure || req.headers['x-forwarded-proto'] == 'https';
  if (!isSecure) return res.redirect('https://' + req.headers.host + req.url);
  next();
});

var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;