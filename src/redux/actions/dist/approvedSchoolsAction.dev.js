"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApprovedSchoolsFailure = exports.getApprovedSchoolsSuccess = exports.getApprovedSchoolsRequest = exports.getAprrovedSchoolsAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _approvedSchoolsTypes = require("../types/approvedSchoolsTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAprrovedSchoolsAction = function getAprrovedSchoolsAction() {
  return function _callee(dispatch) {
    var Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(getApprovedSchoolsRequest());
            Url = 'http://localhost:8000/api/schools/approvedschools';
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get(Url));

          case 5:
            res = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(res);

          case 8:
            _ref = _context.sent;
            data = _ref.data;
            dispatch(getApprovedSchoolsSuccess(data.data));
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
            dispatch(getApprovedSchoolsFailure(errorMessage));
            _context.next = 23;
            break;

          case 22:
            dispatch(getApprovedSchoolsFailure("Network Error"));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  };
};

exports.getAprrovedSchoolsAction = getAprrovedSchoolsAction;

var getApprovedSchoolsRequest = function getApprovedSchoolsRequest() {
  return {
    type: _approvedSchoolsTypes.APPROVED_SCHOOLS_REQUEST
  };
};

exports.getApprovedSchoolsRequest = getApprovedSchoolsRequest;

var getApprovedSchoolsSuccess = function getApprovedSchoolsSuccess(details) {
  return {
    type: _approvedSchoolsTypes.APPROVED_SCHOOLS_SUCCESS,
    payload: details
  };
};

exports.getApprovedSchoolsSuccess = getApprovedSchoolsSuccess;

var getApprovedSchoolsFailure = function getApprovedSchoolsFailure(error) {
  return {
    type: _approvedSchoolsTypes.APPROVED_SCHOOLS_FAILURE,
    payload: error
  };
};

exports.getApprovedSchoolsFailure = getApprovedSchoolsFailure;