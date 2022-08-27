"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHealthfacilitiesFailure = exports.getHealthfacilitiesSuccess = exports.getHealthfacilitiesRequest = exports.getHealthfacilitiesAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _healthfacilityTypes = require("../types/healthfacilityTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getHealthfacilitiesAction = function getHealthfacilitiesAction() {
  return function _callee(dispatch) {
    var Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(getHealthfacilitiesRequest());
            Url = "http://localhost:8000/api/healthfacilities";
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get(Url));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(res);

          case 8:
            _ref = _context.sent;
            data = _ref.data;
            dispatch(getHealthfacilitiesSuccess(data.data));
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
            dispatch(getHealthfacilitiesFailure(errorMessage));
            _context.next = 23;
            break;

          case 22:
            dispatch(getHealthfacilitiesFailure("Network Error"));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  };
};

exports.getHealthfacilitiesAction = getHealthfacilitiesAction;

var getHealthfacilitiesRequest = function getHealthfacilitiesRequest() {
  return {
    type: _healthfacilityTypes.HEALTHFACILITIES_REQUEST
  };
};

exports.getHealthfacilitiesRequest = getHealthfacilitiesRequest;

var getHealthfacilitiesSuccess = function getHealthfacilitiesSuccess(details) {
  return {
    type: _healthfacilityTypes.HEALTHFACILITIES_SUCCESS,
    payload: details
  };
};

exports.getHealthfacilitiesSuccess = getHealthfacilitiesSuccess;

var getHealthfacilitiesFailure = function getHealthfacilitiesFailure(error) {
  return {
    type: _healthfacilityTypes.HEALTHFACILITIES_FAILURE,
    payload: error
  };
};

exports.getHealthfacilitiesFailure = getHealthfacilitiesFailure;