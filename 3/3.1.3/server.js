
console.time('require add first');
var add = require('add');
console.timeEnd('require add first');

var triple = require('./tripleAdd');

console.log(add.add(3, 5));
console.log(triple.add(3, 5));