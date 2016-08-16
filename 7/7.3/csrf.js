var connect = require('connect');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');

connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser('secret'))
  .use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  .use(csrf())
  .listen(3000);