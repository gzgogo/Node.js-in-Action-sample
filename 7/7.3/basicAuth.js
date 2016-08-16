var connect = require('connect');
var basicAuth = require('basic-auth-connect');

var app = connect()
  .use(basicAuth('tobi', 'ferret'))
  .use(function (req, res) {
    res.end('\nI am a secret\n');
  })
  .listen(3000);