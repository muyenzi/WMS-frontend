"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginFailure = exports.loginSuccess = exports.loginRequest = exports.loginAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _loginTypes = require("../types/loginTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginAction = function loginAction(user, navigate) {
  return function _callee(dispatch) {
    var email, password, Url, res, _ref, data, token, _email, role, fullName, userData, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(loginRequest());
            email = user.email;
            password = user.password; //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
            //let basicAuth='Basic ' + btoa(username + ':' + password);

            Url = 'http://localhost:8000/api/auth/login';
            _context.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].post(Url, {
              email: email,
              password: password
            }));

          case 7:
            res = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(res);

          case 10:
            _ref = _context.sent;
            data = _ref.data;

            if (!(data.status === 200)) {
              _context.next = 27;
              break;
            }

            token = res.data.data.token;
            _email = res.data.data.user;
            role = res.data.data.role;
            fullName = res.data.data.fullName;
            userData = {
              email: _email,
              role: role,
              fullName: fullName
            };
            console.log("object", _email, role, userData);
            dispatch(loginSuccess(data));

            if (!(role === "Admin" || role === "DataCollector" || role == "DataController")) {
              _context.next = 25;
              break;
            }

            navigate('/dashboard/app', {
              replace: true
            });
            return _context.abrupt("return", (localStorage.setItem('wmsAuth', token), localStorage.setItem('userAuth', JSON.stringify(userData))));

          case 25:
            navigate('/dashboard/organizations', {
              replace: true
            });
            return _context.abrupt("return", (localStorage.setItem('wmsAuth', token), localStorage.setItem('userAuth', userData)));

          case 27:
            _context.next = 39;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.response) {
              _context.next = 38;
              break;
            }

            _context.next = 34;
            return regeneratorRuntime.awrap(_context.t0.response.data.message);

          case 34:
            errorMessage = _context.sent;
            //const errorMessage = 'Invalid Username or Pin'
            dispatch(loginFailure(errorMessage));
            _context.next = 39;
            break;

          case 38:
            dispatch(loginFailure("Network Error"));

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 29]]);
  };
};

exports.loginAction = loginAction;

var loginRequest = function loginRequest() {
  return {
    type: _loginTypes.LOGIN_REQUEST
  };
};

exports.loginRequest = loginRequest;

var loginSuccess = function loginSuccess(users) {
  return {
    type: _loginTypes.LOGIN_SUCCESS,
    payload: users
  };
};

exports.loginSuccess = loginSuccess;

var loginFailure = function loginFailure(error) {
  return {
    type: _loginTypes.LOGIN_FAILURE,
    payload: error
  };
};

exports.loginFailure = loginFailure;