"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  bot: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  expected_node: {
    type: String,
    required: true,
    unique: true
  },
  right: {
    type: Boolean,
    "default": true // required: true,

  },
  answers: [{
    type: Object // required: true,

  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Test', schema);

exports["default"] = _default;