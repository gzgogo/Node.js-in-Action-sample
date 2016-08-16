
var connect = require('connect');
var logger = require('morgan');
var url = require('url');
var fs = require('fs');

var log = fs.createWriteStream('./app.log', { flags: 'a'});

var app = connect()
  // .use(logger())
  .use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
  // .use(logger('dev'))
  // .use(logger(':method :url :query :status'))
  // .use(logger('dev', { format: ':method :url :query :status', stream: log }))
  // .use(connect.logger({ immediate: true }))
  // .use(connect.logger({ buffer: 2000 }))
  .use(hello)
  .listen(3000);

function hello(req, res) {
  res.end('hello');
}

logger.token('query', function (req, res) {
  return url.parse(req.url).query;
});
