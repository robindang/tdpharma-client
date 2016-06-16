/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var https = require('https');
var http = require('http');
var config = require('./config/environment');
var fs = require('fs');

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server. Only needed for development
 // var options = {
 //      key: fs.readFileSync('./server/config/develop_ssl/server.key'),
 //      cert: fs.readFileSync('./server/config/develop_ssl/server.crt')
 //   };
var app = express();
var server = https.createServer(options, app);
var server_no_ssl = http.createServer(app);

app.use('*',function(req,res,next){  
	var isSecure = req.secure || req.headers['x-forwarded-proto'] == 'https';
  if (!isSecure) return res.redirect('https://' + req.headers.host + req.url);
  next();
});

// var socketio = require('socket.io')(server, {
//   serveClient: (config.env === 'production') ? false : true,
//   path: '/socket.io-client'
// });
// require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

server_no_ssl.listen(9001, config.ip);

// Expose app
exports = module.exports = app;