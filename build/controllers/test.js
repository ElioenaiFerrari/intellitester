"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var R = _interopRequireWildcard(require("ramda"));

var _test = _interopRequireDefault(require("../models/test"));

var _bot = _interopRequireDefault(require("../models/bot"));

var _repo = _interopRequireDefault(require("../repo"));

var _send = _interopRequireDefault(require("../utils/send"));

var _ibm_watson = _interopRequireDefault(require("../services/ibm_watson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TestController = {
  index: function index() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var bot_id = req.params.bot_id;

    _repo["default"].all(_test["default"], {
      bot: bot_id
    }, {
      populate: 'bot'
    }).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
  },
  store: function store() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var bot_id = req.params.bot_id;

    var find_bot = function find_bot(_id) {
      return _repo["default"].find(_bot["default"], {
        _id: _id
      }).then(R.pipe(R.always, R.call))["catch"](_send["default"].json(res, 400));
    };

    var create_test = function create_test(bot) {
      return _repo["default"].create(_test["default"], _objectSpread(_objectSpread({}, req.body), {}, {
        owner: req.auth.user,
        bot: bot
      })).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
    };

    R.pipe(find_bot, R.ifElse(R.andThen(R.has('_id')), R.andThen(create_test), function () {
      return _send["default"].json(res, 404, {
        error: 'bot not found'
      });
    }))(bot_id);
  },
  update: function update() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var bot_id = req.params.bot_id;
    var _req$body = req.body,
        asks = _req$body.asks,
        test_id = _req$body.test_id;
    var get_received_nodes = R.pipe(R.prop('result'), R.prop('output'), R.prop('nodes_visited'));
    var mount_object = R.curry(function (ask, params, received_nodes) {
      return {
        ask: ask,
        node: received_nodes[0],
        ok: params.expected_node === received_nodes[0]
      };
    });
    var send_message = R.curry(function (params, test, ask) {
      return _ibm_watson["default"].create(params).message({
        workspaceId: params.skill_id,
        input: {
          text: ask
        }
      }).then(R.pipe(get_received_nodes, mount_object(ask, test)))["catch"](_send["default"].json(res, 400));
    });

    var go_through_asks = function go_through_asks(params) {
      return _repo["default"].find(_test["default"], {
        _id: test_id
      }).then(function (test) {
        return Promise.all([].concat(asks).map(send_message(params, test)));
      });
    };

    var save_test = function save_test(answers, right) {
      return _repo["default"].update(_test["default"], {
        _id: test_id,
        bot: bot_id
      }, {
        answers: answers,
        right: right
      });
    };

    var verify_content = function verify_content(answers) {
      return R.pipe(R.find(R.propEq('ok', false)), R.ifElse(R.has('node'), function () {
        return save_test(answers, false);
      }, function () {
        return save_test(answers, true);
      }))(answers);
    };

    _repo["default"].find(_bot["default"], {
      _id: bot_id
    }).then(R.pipe(go_through_asks, R.andThen(verify_content), R.andThen(_send["default"].json(res, 200))))["catch"](_send["default"].json(res, 400));
  },
  destroy: function destroy() {
    var req = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _express.request;
    var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _express.response;
    var bot_id = req.params.bot_id;
    var test_id = req.query.test_id;

    _repo["default"]["delete"](_test["default"], {
      _id: test_id,
      bot: bot_id
    }).then(_send["default"].json(res, 200))["catch"](_send["default"].json(res, 400));
  }
};
var _default = TestController;
exports["default"] = _default;