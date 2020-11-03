"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../router/auth"));

var _bot = _interopRequireDefault(require("../router/bot"));

var _test = _interopRequireDefault(require("../router/test"));

var _user = _interopRequireDefault(require("../router/user"));

var _participation = _interopRequireDefault(require("../router/participation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = function routes(app) {
  return [{
    use: true,
    name: 'routes/auth',
    implement: function implement() {
      return (0, _auth["default"])(app);
    }
  }, {
    use: true,
    name: 'routes/bot',
    implement: function implement() {
      return (0, _bot["default"])(app);
    }
  }, {
    use: true,
    name: 'routes/test',
    implement: function implement() {
      return (0, _test["default"])(app);
    }
  }, {
    use: true,
    name: 'routes/user',
    implement: function implement() {
      return (0, _user["default"])(app);
    }
  }, {
    use: true,
    name: 'routes/participation',
    implement: function implement() {
      return (0, _participation["default"])(app);
    }
  }];
};

var _default = routes;
exports["default"] = _default;