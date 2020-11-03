"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var R = _interopRequireWildcard(require("ramda"));

var _send = _interopRequireDefault(require("../utils/send"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../config/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AuthMiddleware = {
  check: function check() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var next = arguments.length > 2 ? arguments[2] : undefined;
    var get_authorization = R.pipe(R.prop('headers'), R.prop('authorization'), R.split(' '));
    var has_authorization = R.pipe(R.prop('headers'), R.has('authorization'));

    var is_valid_token = function is_valid_token(data) {
      return R.equals(R.length(data), 2);
    };

    var decode_token = function decode_token(token) {
      return _jsonwebtoken["default"].verify(token[0], _env["default"].get('APP_SECRET'));
    };

    var store_user = R.curry(function (req, user) {
      return req.auth = user;
    });

    var pass_up = function pass_up() {
      return next();
    };

    var is_authorized = R.ifElse(has_authorization, R.pipe(get_authorization, R.ifElse(is_valid_token, R.pipe(R.takeLast(1), decode_token, store_user(req), pass_up), function () {
      return _send["default"].json(res, 401, {
        error: 'invalid token'
      });
    })), function () {
      return _send["default"].json(res, 401, {
        error: 'unauthorized'
      });
    });
    R.tryCatch(is_authorized, _send["default"].json(res, 400))(req);
  }
};
var _default = AuthMiddleware;
exports["default"] = _default;