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
  team: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'User',
    required: true
  }],
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    "enum": ['PROD', 'HOM']
  },
  apikey: {
    type: String,
    required: true,
    unique: true
  },
  service_url: {
    type: String,
    required: true,
    unique: true
  },
  dialog_url: {
    type: String,
    required: true,
    unique: true
  },
  skill_id: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Bot', schema);

exports["default"] = _default;