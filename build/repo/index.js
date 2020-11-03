"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Repo = {
  all: R.curry(function (model) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        populate = _ref.populate;

    return Promise.resolve(model.find(params).populate(populate)).then(R.always)["catch"](R.always).then(R.call);
  }),
  find: R.curry(function (model, params) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        populate = _ref2.populate;

    return Promise.resolve(model.findOne(params).populate(populate)).then(R.always)["catch"](R.always).then(R.call);
  }),
  create: R.curry(function (model, params) {
    return Promise.resolve(model.create(params)).then(R.always)["catch"](R.always).then(R.call);
  }),
  "delete": R.curry(function (model, by) {
    return Promise.resolve(model.findOneAndDelete(by)).then(R.always)["catch"](R.always).then(R.call);
  }),
  update: R.curry(function (model, by, params) {
    return Promise.resolve(model.findOneAndUpdate(by, params, {
      "new": true
    })).then(R.always)["catch"](R.always).then(R.call);
  })
};
var _default = Repo;
exports["default"] = _default;