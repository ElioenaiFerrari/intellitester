"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bot = _interopRequireDefault(require("../controllers/bot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _bot["default"].store);
router.get('/', _bot["default"].index);
router.get('/:id', _bot["default"].show);
router.put('/:id', _bot["default"].update);
router["delete"]('/:id', _bot["default"].destroy);

var _default = function _default(app) {
  return app.use('/app/bots', router);
};

exports["default"] = _default;