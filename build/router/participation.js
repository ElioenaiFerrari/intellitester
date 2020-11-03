"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _participation = _interopRequireDefault(require("../controllers/participation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _participation["default"].store);
router.get('/', _participation["default"].index); // router.get('/:id', ParticipationController.show);

router.put('/:id', _participation["default"].update); // router.delete('/:id', ParticipationController.destroy);

var _default = function _default(app) {
  return app.use('/app/participations', router);
};

exports["default"] = _default;