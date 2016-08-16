var Photo = require('../models/Photo');
var Photos = require('../models/Photos');
var path = require('path');
var fs = require('fs');
var multiparty = require('multiparty');
var join = path.join;

var photos = new Photos();

// photos.push({
//   name: 'Node.js Logo',
//   path: 'https://nodejs.org/static/images/logos/nodejs-green.png'
// });
//
// photos.push({
//   name: 'Ryan Speeking',
//   path: 'https://nodejs.org/static/legacy/images/ryan-speaker.jpg'
// });

exports.list = function (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  });
};

exports.form = function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  })
};

exports.submit = function (dir) {
  return function (req, res, next) {
    var form = new multiparty.Form({ uploadDir:  process.cwd() + '/public/tmp/'});

    form.parse(req, function(err, fields, files) {
      var file = files['photo[image]'][0];
      var originalName = file.originalFilename;
      var tmpName = path.basename(file.path)
      var photosDir = 'photos/';
      var dstPath = join(dir, photosDir + tmpName);

      try {
        fs.rename(file.path, dstPath ,function (err) {
          if (err) {
            return next(err);
          }

          photos.push(new Photo(originalName, photosDir + tmpName)); //利用express-static中间件
          res.redirect('/');
          // Photo.create({
          //   name: name,
          //   path: img.name
          // }, function (err) {
          //   if (err) {
          //     return next(err);
          //     res.redirect('/');
          //   }
          // })
        })
      }
      catch (e) {
        console.log(e);
      }
    });
  }
};

exports.download = function (dir) {
  return function (req, res, next) {
    var id = req.params.id;
    var photo = photos.findById(id);
    if (photo) {
      var path = join(dir, photo.path);
      // res.sendfile(path);
      res.download(path, photo.name);
    }
  }
}

