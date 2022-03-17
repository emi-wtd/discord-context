'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var router = require('next/router');
var axios = _interopDefault(require('axios'));
var jsxRuntime = require('react/jsx-runtime');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var context = /*#__PURE__*/react.createContext();
var Provider = context.Provider;
var useDiscord = function useDiscord() {
  return react.useContext(context);
};
var DiscordProvider = function DiscordProvider(_ref) {
  var redirectUri = _ref.redirectUri,
      discordClientId = _ref.discordClientId,
      discordClientSecret = _ref.discordClientSecret,
      children = _ref.children;

  var _useState = react.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      discordUser = _useState2[0],
      setDiscordUser = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      oauthData = _useState4[0],
      setOauthData = _useState4[1];

  var _useState5 = react.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loadingDiscordUserData = _useState6[0],
      setLoadingDiscordUserData = _useState6[1];

  var router$1 = router.useRouter();
  var code = router$1.query.code;
  var getUserFromDiscord = react.useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token_type, access_token) {
      var userResult;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoadingDiscordUserData(true);
              _context.next = 4;
              return axios.get("https://discord.com/api/users/@me", {
                headers: {
                  Authorization: "".concat(token_type, " ").concat(access_token)
                }
              });

            case 4:
              userResult = _context.sent;
              setLoadingDiscordUserData(false);
              setDiscordUser(userResult.data);
              return _context.abrupt("return", userResult.data);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              setLoadingDiscordUserData(false);
              throw _context.t0;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }(), []);

  var clearUserState = function clearUserState() {
    setDiscordUser(null);
  };

  var getTokenFromDiscord = react.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var oauthResult;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
              client_id: discordClientId,
              client_secret: discordClientSecret,
              code: code,
              grant_type: "authorization_code",
              redirect_uri: redirectUri,
              scope: "identify"
            }));

          case 3:
            oauthResult = _context2.sent;
            setOauthData(oauthResult.data);
            return _context2.abrupt("return", oauthResult.data);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  })), [code]);

  var loginWithDiscord = function loginWithDiscord() {
    router$1.push("https://discord.com/api/oauth2/authorize?".concat(new URLSearchParams({
      client_id: discordClientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "identify email guilds.join"
    }).toString()));
  };

  react.useEffect(function () {
    var getData = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _oauthData;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return getTokenFromDiscord();

              case 3:
                _oauthData = _context3.sent;
                _context3.next = 6;
                return getUserFromDiscord(_oauthData.token_type, _oauthData.access_token);

              case 6:
                _context3.next = 10;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      return function getData() {
        return _ref4.apply(this, arguments);
      };
    }();

    if (code) getData();
  }, [code, router$1, getTokenFromDiscord, getUserFromDiscord]);
  return /*#__PURE__*/jsxRuntime.jsx(Provider, {
    value: {
      loginWithDiscord: loginWithDiscord,
      discordUser: discordUser,
      clearUserState: clearUserState,
      oauthData: oauthData,
      loadingDiscordUserData: loadingDiscordUserData,
      getUserFromDiscord: getUserFromDiscord
    },
    children: children
  });
};

exports.DiscordProvider = DiscordProvider;
exports.useDiscord = useDiscord;
//# sourceMappingURL=index.js.map