var connect = require('connect');
var compress = require('compression');
var static = require('serve-static');

var app = connect()
  // .use(compress())
  // .use(compress({ filter: filter }))
  .use(compress({ level: 3, memLevel: 8 }))
  .use(static('source'))
  .listen(3000);

function filter(req) {
  var type = req.getHeader('Content-Type') || '';
  return 0 == type.indexOf('text/plain');
}