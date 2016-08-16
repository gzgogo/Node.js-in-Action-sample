var logger = require('./logger');
var router = require('./router');
var connect = require('connect');

var routes ={
  GET: {
    '/users': function (req, res) {
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function (req, res, id) {
      res.end('user ' + id);
    }
  },

  DELETE: {
    '/user/:id': function (req, res, id) {
      res.end('deleted user ' + id);
    }
  }
}

var app = connect();
app.use(logger(':method - :url'));
app.use('/admin', restrict);
app.use('/admin', admin);
app.use(router(routes));
// app.use(hello);
app.listen(3000);

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

function restrict(req, res, next) {
  var authorization = req.headers.authorization;
  if (!authorization) {
    return next(new Error('Unauthorized'));
  }

  var parts = authorization.split(' ');
  var scheme = parts[0];
  var auth = new Buffer(parts[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  authenticateWithDatabase(user, pass, function (err) {
    if (err) {
      return next(err);
    }
    next();
  })
}

function admin(req, res, next) {
  switch (req.url) {
    case '/':
      res.end('try /users');
      break;
    case '/users':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(['tobi', 'loki', 'jane']));
      break;
    default:
      break;
  }
}

function authenticateWithDatabase(user, pass, callback) {
  var err;
  if (user != 'tobi' || pass != 'ferret') {
    err = new Error('Unauthorized');
  }
  callback(err);
}
