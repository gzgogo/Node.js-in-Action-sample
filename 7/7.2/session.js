var connect = require('connect');
var favicon = require('serve-favicon');
/*
* Note Since version 1.5.0, the cookie-parser middleware no longer needs
* to be used for this module to work. This module now directly reads and writes
* cookies on req/res. Using cookie-parser may result in issues if the secret
* is not the same between this module and cookie-parser.
* var cookieParser = require('cookie-parser');
* */
var session = require('express-session');

var app = connect()
  .use(favicon(__dirname + '/public/favicon.ico'))
  // .use(cookieParser('keyboard cat'))
  .use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60 * 60 * 1000 } //one hour
    // cookie: { secure: true }
  }))
  .use(function (req, res, next) {
    var sess = req.session;
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>Views: ' + sess.views++ + '</p>');
      res.write('<p>expires in: ' + sess.cookie.maxAge / 1000 + 's</p>');
      res.write('<p>httpOnly: ' + sess.cookie.httpOnly + '</p>');
      res.write('<p>path: ' + sess.cookie.path + '</p>');
      res.write('<p>domain: ' + sess.cookie.domain + '</p>');
      res.write('<p>secure: ' + sess.cookie.secure + '</p>');
      res.end();
      // console.log(sess.views);
      // sess.views++; //只有将对session对象的改变放到res.end()之前才会被自动保存
    }
    else {
      sess.views = 1;
      res.end('Welcome to the session demo. refresh!');
    }
  })
  .listen(3000);