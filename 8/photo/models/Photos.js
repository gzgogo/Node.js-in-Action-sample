var Photo = require('./Photo');

function Photos() {
  Array.call(this);
}

// Photos.prototype.push = function (photo) {
//   this.photoArray.push(photo);
//
// };

Photos.prototype = Object(Array.prototype);

Photos.prototype.findById = function (id) {
  var photo = null;

  this.forEach(function (item) {
    if (item.id === id) {
      photo = item;
      return;
    }
  });

  return photo;
};

module.exports = Photos;