"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _express = require("express");

var _send = _interopRequireDefault(require("../utils/send"));

var _repo = _interopRequireDefault(require("../repo"));

var _participation = _interopRequireDefault(require("../models/participation"));

var _bot = _interopRequireDefault(require("../models/bot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ParticipationController = {
  store: function store() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var bot_id = req.body.bot_id;

    var store_participation = function store_participation(bot) {
      return Promise.resolve(_repo["default"].create(_participation["default"], _objectSpread(_objectSpread({}, req.body), {}, {
        bot: bot,
        from: req.auth.user
      })));
    };

    _repo["default"].find(_bot["default"], {
      _id: bot_id
    }).then(store_participation).then(_send["default"].json(res, 201))["catch"](_send["default"].json(res, 400));
  },
  index: function index() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;

    _repo["default"].all(_participation["default"], req.query, {
      populate: ['bot', 'for', 'to']
    }).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
  },
  update: function update() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var id = req.params.id;
    var add_user_to_team = R.curry(function (bot, user) {
      return Promise.resolve(_repo["default"].update(_bot["default"], {
        _id: bot
      }, {
        $push: {
          team: user
        }
      }));
    });
    var participation_response = R.ifElse(R.propEq('status', 'ACCEPTED'), function (_ref) {
      var bot = _ref.bot,
          from = _ref.from;
      return add_user_to_team(bot, from);
    }, function () {
      return _send["default"].json(res, 200, {
        message: 'you request has rejected'
      });
    });

    _repo["default"].update(_participation["default"], {
      _id: id
    }, req.body).then(R.pipe(participation_response)).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
  } // destroy: (req = request, res = response) => {
  //   const { id } = req.params;
  //   Repo.delete(Participation, { _id: id }, req.body)
  //     .then(Send.json(res, 200))
  //     .catch(Send.json(res, 400));
  // },

};
var _default = ParticipationController;
exports["default"] = _default;