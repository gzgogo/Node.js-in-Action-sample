
var connect = require('connect');
var bodyParser = require('body-parser');

var app = connect();
app.use(bodyParser.json({ limit: 26 }));
app.use(function (req, res) {
  console.log(req.body);
  // res.end('hello');
});
app.listen(3000);