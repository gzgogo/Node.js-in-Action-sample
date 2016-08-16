var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
  switch (req.method) {
    case 'POST':
      var item = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        item += chunk;
      });
      req.on('end', function () {
        items.push(item);
        res.end('OK\n');
      })
      break;
    case 'GET':
      var body = items.map(function (item, i) {
        return i + ') ' + item ;
      }).join('\n');
      body = '\n' + body;
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('\nInvalid item id');
      }
      else if (!items[i]) {
        res.statusCode = 404;
        res.end('\nItem not found');
      }
      else {
        items.splice(i, 1);
        res.end('\nOK\n');
      }
      break;
    case 'PUT':
      var query = url.parse(req.url).query;
      query = query.split('=');
      if (query.length == 2) {
        var index = parseInt(query[0], 10);
        if (isNaN(index)) {
          res.statusCode = 400;
          res.end('Invalid item id');
        }
        else if (!items[index]) {
          res.statusCode = 404;
          res.end('Item not found');
        }
        else {
          items[index] = query[1];
          res.end('\nOK\n');
        }
      }
      break;
  }
});

server.listen(3000);