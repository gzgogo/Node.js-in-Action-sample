console.time('require add second');
var add = require('add');
console.timeEnd('require add second');

module.exports.add = function (a, b) {
    return add.add(a, b) * 3;
}