var connect = require('connect');
var cookieParser = require('cookie-parser');

var app = connect()
      .use(cookieParser('tobi is a cool ferret'))
      .use(function (req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('\nhelllo\n');
      }).listen(3000);