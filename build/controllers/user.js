"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _repo = _interopRequireDefault(require("../repo"));

var _send = _interopRequireDefault(require("../utils/send"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserController = {
  index: function index() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;

    _repo["default"].all(_user["default"]).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
  },
  current: function current() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var next = arguments.length > 2 ? arguments[2] : undefined;
    return _send["default"].json(res, 200, req.auth.user);
  }
};
var _default = UserController;
exports["default"] = _default;