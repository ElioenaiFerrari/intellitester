"use strict";

var Bcrypt = require('bcryptjs');

var _require = require('./env'),
    Env = _require["default"];

var Secret = {
  gen: function gen() {
    var salts = Bcrypt.genSaltSync(8);
    var key = Bcrypt.hashSync(Env.get('APP_SECRET'), salts);
    return Env.set('APP_SECRET', key);
  }
};
module.exports = Secret;