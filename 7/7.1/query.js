
var connect = require('connect');
var query = require('connect-query');

var app = connect();
app.use(query());
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.write('\n');
  res.end(JSON.stringify(req.query));
  console.log(JSON.stringify(req.query));
});
app.listen(3000);
