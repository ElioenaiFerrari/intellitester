"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("ibm-watson/assistant/v1"));

var _auth = require("ibm-watson/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IbmWatson = {
  create: function create(_ref) {
    var apikey = _ref.apikey,
        service_url = _ref.service_url,
        _ref$version = _ref.version,
        version = _ref$version === void 0 ? '2020-09-10' : _ref$version,
        _ref$disable_ssl_veri = _ref.disable_ssl_verification,
        disable_ssl_verification = _ref$disable_ssl_veri === void 0 ? true : _ref$disable_ssl_veri;
    return new _v["default"]({
      authenticator: new _auth.IamAuthenticator({
        apikey: apikey
      }),
      serviceUrl: service_url,
      version: version,
      disableSslVerification: disable_ssl_verification
    });
  }
};
var _default = IbmWatson;
exports["default"] = _default;