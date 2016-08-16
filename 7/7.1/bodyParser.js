var connect = require('connect');
var bodyParser = require('body-parser');

var app = connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res) {
  console.log(req.body);
  console.log(req.files);
  res.end('thanks');
});
app.listen(3000);