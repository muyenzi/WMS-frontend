"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSchoolFailure = exports.addSchoolSuccess = exports.addSchoolRequest = exports.addSchoolAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _addSchoolTypes = require("../types/addSchoolTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addSchoolAction = function addSchoolAction(details, navigate) {
  return function _callee(dispatch) {
    var provinceName, districtName, sectorName, cellName, villageName, schoolName, schoolSource, schoolFrequency, schoolHowLong, schoolLevel, Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(addSchoolRequest()); // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel

            provinceName = details.provinceName;
            districtName = details.districtName;
            sectorName = details.sectorName;
            cellName = details.cellName;
            villageName = details.villageName;
            schoolName = details.schoolName;
            schoolSource = details.schoolSource;
            schoolFrequency = details.schoolFrequency;
            schoolHowLong = details.schoolHowLong;
            schoolLevel = details.schoolLevel;
            Url = 'http://localhost:8000/api/schools/new-chool';
            _context.next = 15;
            return regeneratorRuntime.awrap(_axios["default"].post(Url, {
              name: schoolName,
              source: schoolSource,
              frequency: schoolFrequency,
              how_long: schoolHowLong,
              level: schoolLevel,
              prov_name: provinceName.replaceAll(/\s/g, ''),
              dis_name: districtName.replaceAll(/\s/g, ''),
              sec_name: sectorName.replaceAll(/\s/g, ''),
              cell_name: cellName.replaceAll(/\s/g, ''),
              vil_name: villageName.replaceAll(/\s/g, '')
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
              dispatch(addSchoolSuccess(data.message));
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
            dispatch(addSchoolFailure(errorMessage));
            _context.next = 34;
            break;

          case 33:
            dispatch(addSchoolFailure("Network Error"));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 24]]);
  };
};

exports.addSchoolAction = addSchoolAction;

var addSchoolRequest = function addSchoolRequest() {
  return {
    type: _addSchoolTypes.ADD_SCHOOL_REQUEST
  };
};

exports.addSchoolRequest = addSchoolRequest;

var addSchoolSuccess = function addSchoolSuccess(schools) {
  return {
    type: _addSchoolTypes.ADD_SCHOOL_SUCCESS,
    payload: schools
  };
};

exports.addSchoolSuccess = addSchoolSuccess;

var addSchoolFailure = function addSchoolFailure(error) {
  return {
    type: _addSchoolTypes.ADD_SCHOOL_FAILURE,
    payload: error
  };
};

exports.addSchoolFailure = addSchoolFailure;