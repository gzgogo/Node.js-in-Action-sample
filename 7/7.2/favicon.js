var connect = require('connect');
var favicon = require('serve-favicon');
var logger = require('morgan');

connect()
  .use(favicon(__dirname + '/public/favicon.ico'))
  .use(logger('dev'))
  .use(function (req, res) {
    res.end('Hello World!\n');
  })
  .listen(3000);