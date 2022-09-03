"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicPlacesFailure = exports.getPublicPlacesSuccess = exports.getPublicPlacesRequest = exports.getPublicPlacesAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _publicPlacesTypes = require("../types/publicPlacesTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getPublicPlacesAction = function getPublicPlacesAction() {
  return function _callee(dispatch) {
    var Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(getPublicPlacesRequest());
            Url = "http://localhost:8000/api/publicplaces";
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get(Url));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(res);

          case 8:
            _ref = _context.sent;
            data = _ref.data;
            dispatch(getPublicPlacesSuccess(data.data));
            _context.next = 23;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.response) {
              _context.next = 22;
              break;
            }

            _context.next = 18;
            return regeneratorRuntime.awrap(_context.t0.response.data.message);

          case 18:
            errorMessage = _context.sent;
            dispatch(getPublicPlacesFailure(errorMessage));
            _context.next = 23;
            break;

          case 22:
            dispatch(getPublicPlacesFailure("Network Error"));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  };
};

exports.getPublicPlacesAction = getPublicPlacesAction;

var getPublicPlacesRequest = function getPublicPlacesRequest() {
  return {
    type: _publicPlacesTypes.PUBLICPLACE_REQUEST
  };
};

exports.getPublicPlacesRequest = getPublicPlacesRequest;

var getPublicPlacesSuccess = function getPublicPlacesSuccess(details) {
  return {
    type: _publicPlacesTypes.PUBLICPLACE_SUCCESS,
    payload: details
  };
};

exports.getPublicPlacesSuccess = getPublicPlacesSuccess;

var getPublicPlacesFailure = function getPublicPlacesFailure(error) {
  return {
    type: _publicPlacesTypes.PUBLICPLACE_FAILURE,
    payload: error
  };
};

exports.getPublicPlacesFailure = getPublicPlacesFailure;