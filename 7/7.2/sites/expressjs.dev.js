
var connect = require('connect');

var app = connect();
app.use(function (req, res) {
  res.end('hello from expressjs.com\n');
});


module.exports = app;