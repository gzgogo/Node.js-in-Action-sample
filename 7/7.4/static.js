var connect = require('connect');
var static = require('serve-static');

connect()
  // .use(static('public')) //传入的路径相对于当前工作目录，即进程的当前目录，与__dirname不同，
  .use('/app/files', static('public'))
  .listen(3000);