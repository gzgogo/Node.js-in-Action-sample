var connect = require('connect');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var app = connect()
  .use(logger('dev'))
  .use(function (req, res, next) {
    setTimeout(function () {
      next(new Error('something broke!'));
    });
  })
  .use(errorHandler())
  .listen(3000);