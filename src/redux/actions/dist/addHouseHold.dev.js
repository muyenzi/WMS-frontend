"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHouseHoldFailure = exports.addHouseHoldSuccess = exports.addHouseHoldRequest = exports.addHouseHoldAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _addHouseHoldTypes = require("../types/addHouseHoldTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addHouseHoldAction = function addHouseHoldAction(details, navigate) {
  return function _callee(dispatch) {
    var provinceName, districtName, sectorName, cellName, villageName, householdPhone, householdSource, householdFrequency, householdHowLong, Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(addHouseHoldRequest()); // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel

            provinceName = details.provinceName;
            districtName = details.districtName;
            sectorName = details.sectorName;
            cellName = details.cellName;
            villageName = details.villageName;
            householdPhone = details.householdPhone;
            householdSource = details.householdSource;
            householdFrequency = details.householdFrequency;
            householdHowLong = details.householdHowLong;
            Url = 'http://localhost:8000/api/households/new-household';
            _context.next = 14;
            return regeneratorRuntime.awrap(_axios["default"].post(Url, {
              phoneNumber: householdPhone,
              source: householdSource,
              frequency: householdFrequency,
              how_long: householdHowLong,
              prov_name: provinceName,
              dis_name: districtName,
              sec_name: sectorName,
              cell_name: cellName,
              vil_name: villageName
            }));

          case 14:
            res = _context.sent;
            _context.next = 17;
            return regeneratorRuntime.awrap(res);

          case 17:
            _ref = _context.sent;
            data = _ref.data;
            console.log(data);

            if (data.responseCode === 200) {
              dispatch(addHouseHoldSuccess(data.message));
            }

            _context.next = 33;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.response) {
              _context.next = 32;
              break;
            }

            _context.next = 28;
            return regeneratorRuntime.awrap(_context.t0.response.data.message);

          case 28:
            errorMessage = _context.sent;
            //const errorMessage = 'Invalid Username or Pin'
            dispatch(addHouseHoldFailure(errorMessage));
            _context.next = 33;
            break;

          case 32:
            dispatch(addHouseHoldFailure("Network Error"));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 23]]);
  };
};

exports.addHouseHoldAction = addHouseHoldAction;

var addHouseHoldRequest = function addHouseHoldRequest() {
  return {
    type: _addHouseHoldTypes.ADD_HOUSEHOLD_REQUEST
  };
};

exports.addHouseHoldRequest = addHouseHoldRequest;

var addHouseHoldSuccess = function addHouseHoldSuccess(details) {
  return {
    type: _addHouseHoldTypes.ADD_HOUSEHOLD_SUCCESS,
    payload: details
  };
};

exports.addHouseHoldSuccess = addHouseHoldSuccess;

var addHouseHoldFailure = function addHouseHoldFailure(error) {
  return {
    type: _addHouseHoldTypes.ADD_HOUSEHOLD_FAILURE,
    payload: error
  };
};

exports.addHouseHoldFailure = addHouseHoldFailure;