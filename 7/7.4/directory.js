var connect = require('connect');
var directory = require('serve-index');
var static = require('serve-static');

// connect()
//   .use(directory('public'))
//   .use(static('public'))
//   .listen(3000);

connect()
  .use('/files', directory('public', { icons: true, hidden: true}))
  .use('/files', static('public', { hidden: true }))
  .listen(3000);