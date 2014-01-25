var framework = require('total.js');
var http = require('http');

var port = parseInt(process.argv[2] || '8001', 10);
var debug = true;

// '10.0.1.2'
framework.run(http, debug, port);