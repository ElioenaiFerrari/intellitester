"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _test = _interopRequireDefault(require("../controllers/test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/:bot_id', _test["default"].store);
router.get('/:bot_id', _test["default"].index);
router.put('/:bot_id', _test["default"].update);
router["delete"]('/:bot_id', _test["default"].destroy);

var _default = function _default(app) {
  return app.use('/app/tests', router);
};

exports["default"] = _default;