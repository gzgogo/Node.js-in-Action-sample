var redis = require('redis');
var crypto = require('crypto');
var db = redis.createClient();

module.exports = User;

function User(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}

User.prototype.save = function (fn) {
  if (this.id) {
    this.update(fn);
  }
  else {
    var user = this;
    db.incr('user:ids', function (err, id) {
      if (err) {
        return fn(err);
      }
      user.id = id;
      user.hashPassword(function (err) {
        if (err) {
          return fn(err);
        }
        user.update(fn);
      })
    })
  }
};

User.prototype.update = function (fn) {
  var user = this;
  var id = user.id;
  db.set('user:id:' + user.name, id, function (err) {
    if (err) {
      return fn(err);
    }
    db.hmset('user:' + id, user, function (err) {
      fn(err);
    })
  })
};

User.prototype.hashPassword = function (fn) {
  var user = this;

  user.salt = crypto.randomBytes(16).toString('hex');
  // console.log('salt: ' + user.salt);

  var sha1 = crypto.createHash('sha1');
  sha1.update(user.pass).update(user.salt);

  user.pass = sha1.digest('hex');
  fn();
}

User.getByName = function (name, fn) {
  User.getId(name, function (err, id) {
    if (err) {
      return fn(err);
    }
    User.get(id, fn);
  });
};

User.getId = function (name, fn) {
  db.get('user:id:' + name, fn);
};

User.get = function (id, fn) {
  db.hgetall('user:' + id, function (err, user) {
    if (err) {
      return fn(err);
    }
    fn(null, new User(user));
  });
};

User.authenticate = function (name, pass, fn) {
  User.getByName(name, function (err, user) {
    if (err) {
      return fn(err);
    }
    if(!user.id) {
      return fn();
    }

    var sha1 = crypto.createHash('sha1');
    sha1.update(pass).update(user.salt);

    var hash = sha1.digest('hex');
    if (hash === user.pass) {
      return fn(null, user);
    }

    fn(); //密码无效
  })
};

User.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name
  }
};


// var tobi = new User({
//   name: 'tobi',
//   pass: 'im a secret',
//   age: '2'
// });
//
// tobi.save(function (err) {
//   if (err) {
//     throw err;
//   }
//   console.log('user id %d', tobi.id);
// })

