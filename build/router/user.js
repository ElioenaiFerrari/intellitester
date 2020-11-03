"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // router.post('/', UserController.store);

router.get('/', _user["default"].index);
router.get('/current', _user["default"].current); // router.get('/:id', UserController.show);
// router.put('/:id', UserController.update);
// router.delete('/:id', UserController.destroy);

var _default = function _default(app) {
  return app.use('/app/users', router);
};

exports["default"] = _default;