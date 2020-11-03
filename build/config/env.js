"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var Env = {
  get: function get(env) {
    return process.env[env];
  },
  set: function set(env, value) {
    return process.env[env] = value;
  }
};
var _default = Env;
exports["default"] = _default;