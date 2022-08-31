"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHealthFacilityFailure = exports.addHealthFacilitySuccess = exports.addHealthFacilityRequest = exports.addHealthFacilityAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _addHealthFacilityTypes = require("../types/addHealthFacilityTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addHealthFacilityAction = function addHealthFacilityAction(details, navigate) {
  return function _callee(dispatch) {
    var provinceName, districtName, sectorName, cellName, villageName, healthfacilityName, healthfacilitySource, healthfacilityType, healthfacilityHowLong, Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(addHealthFacilityRequest());
            console.log("ooppp", details); // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel

            provinceName = details.provinceName;
            districtName = details.districtName;
            sectorName = details.sectorName;
            cellName = details.cellName;
            villageName = details.villageName;
            healthfacilityName = details.healthfacilityName;
            healthfacilitySource = details.healthfacilitySource;
            healthfacilityType = details.healthfacilityType;
            healthfacilityHowLong = details.healthfacilityHowLong;
            Url = 'http://localhost:8000/api/healthfacilities/new-healthfacility';
            _context.next = 15;
            return regeneratorRuntime.awrap(_axios["default"].post(Url, {
              name: healthfacilityName,
              source: healthfacilitySource,
              type: healthfacilityType,
              how_long: healthfacilityHowLong,
              prov_name: provinceName,
              dis_name: districtName,
              sec_name: sectorName,
              cell_name: cellName,
              vil_name: villageName
            }));

          case 15:
            res = _context.sent;
            _context.next = 18;
            return regeneratorRuntime.awrap(res);

          case 18:
            _ref = _context.sent;
            data = _ref.data;
            console.log(data);

            if (data.responseCode === 200) {
              dispatch(addHealthFacilitySuccess(data.message));
            }

            _context.next = 34;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);

            if (!_context.t0.response) {
              _context.next = 33;
              break;
            }

            _context.next = 29;
            return regeneratorRuntime.awrap(_context.t0.response.data.message);

          case 29:
            errorMessage = _context.sent;
            //const errorMessage = 'Invalid Username or Pin'
            dispatch(addHealthFacilityFailure(errorMessage));
            _context.next = 34;
            break;

          case 33:
            dispatch(addHealthFacilityFailure("Network Error"));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 24]]);
  };
};

exports.addHealthFacilityAction = addHealthFacilityAction;

var addHealthFacilityRequest = function addHealthFacilityRequest() {
  return {
    type: _addHealthFacilityTypes.ADD_HEALTHFACILITY_REQUEST
  };
};

exports.addHealthFacilityRequest = addHealthFacilityRequest;

var addHealthFacilitySuccess = function addHealthFacilitySuccess(details) {
  return {
    type: _addHealthFacilityTypes.ADD_HEALTHFACILITY_SUCCESS,
    payload: details
  };
};

exports.addHealthFacilitySuccess = addHealthFacilitySuccess;

var addHealthFacilityFailure = function addHealthFacilityFailure(error) {
  return {
    type: _addHealthFacilityTypes.ADD_HEALTHFACILITY_FAILURE,
    payload: error
  };
};

exports.addHealthFacilityFailure = addHealthFacilityFailure;