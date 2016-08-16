var connect = require('connect');
var vhost = require('vhost');

var server = connect();

var app = require('./sites/expressjs.dev');
server.use(vhost('expressjs.dev', app));

server.listen(3000);