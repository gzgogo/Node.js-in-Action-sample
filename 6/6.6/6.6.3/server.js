
var connect = require('connect');

var api = connect();
api.use(users);
api.use('/pet', pets);
api.use(errorHandler);

var app = connect();
app.use('/hello', hello);
app.use('/api', api);
app.use(errorPage);
app.listen(3000);

function hello(req, res, next) {
  // res.end('Hello World\n');
  next(new Error('Bad middleware makes error'));
}

var db = {
  users: {
    'tobi': 'tobi',
    'loki': 'loki',
    'jane': 'jane'
  }
};

function users(req, res, next) {
  var match = req.url.match(/^\/user\/(.+)/);
  if (match) {
    var user = db.users[match[1]];
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    }
    else {
      var err = new Error('User not found');
      err.notFound = true;
      next(err);
    }
  }
  else {
    next();
  }
}

function pets(req, res, next) {
  foo();
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.setHeader('Content-Type', 'application/json');
  if (err.notFound) {
    res.statusCode = 404;
    res.end(JSON.stringify( { error: err.message } ));
  }
  else {
    res.statusCode = 500;
    res.end(JSON.stringify( { error: 'Internal Server Error' } ));
  }
}

function errorPage(err, req, res, next) {
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>' + err.message + '</h1>')
}