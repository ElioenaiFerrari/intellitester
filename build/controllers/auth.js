"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _repo = _interopRequireDefault(require("../repo"));

var R = _interopRequireWildcard(require("ramda"));

var _user = _interopRequireDefault(require("../models/user"));

var _send = _interopRequireDefault(require("../utils/send"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../config/env"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AuthController = {
  signup: function signup() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var next = arguments.length > 2 ? arguments[2] : undefined;

    _repo["default"].create(_user["default"], req.body).then(_send["default"].json(res, 201))["catch"](_send["default"].json(res, 400));
  },
  signin: function signin() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var next = arguments.length > 2 ? arguments[2] : undefined;
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;
    var compare_hash = R.curry(function (password, hash) {
      return _bcryptjs["default"].compareSync(password, hash);
    });

    var check_credentials = function check_credentials(user) {
      return R.ifElse(compare_hash(password), function () {
        return {
          token: gen_token({
            user: user
          })
        };
      }, function () {
        return _send["default"].json(res, 400, {
          error: 'invalid credentials'
        });
      })(user.password);
    };

    var gen_token = function gen_token(data) {
      return _jsonwebtoken["default"].sign(data, _env["default"].get('APP_SECRET'));
    };

    var send_result = R.ifElse(R.has('token'), _send["default"].json(res, 200), _send["default"].json(res, 400));

    _repo["default"].find(_user["default"], {
      email: email
    }).then(check_credentials).then(send_result)["catch"](_send["default"].json(res, 400));
  }
};
var _default = AuthController;
exports["default"] = _default;