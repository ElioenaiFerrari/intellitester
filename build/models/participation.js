"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  bot: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  from: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    "default": 'PENDING',
    "enum": ['PENDING', 'ACCEPTED', 'REJECTED']
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Participation', schema);

exports["default"] = _default;