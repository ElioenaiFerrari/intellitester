"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middlewares = function middlewares(app) {
  return [{
    use: true,
    name: 'middlewares/cors',
    implement: function implement() {
      return app.use((0, _cors["default"])({
        origin: true
      }));
    }
  }, {
    use: true,
    name: 'middlewares/json',
    implement: function implement() {
      return app.use(_express["default"].json());
    }
  }, {
    use: true,
    name: 'middlewares/morgan',
    implement: function implement() {
      return app.use((0, _morgan["default"])('dev'));
    }
  }, {
    use: true,
    name: 'middlewares/auth',
    implement: function implement() {
      return app.use(['/app'], _auth["default"].check);
    }
  }];
};

var _default = middlewares;
exports["default"] = _default;