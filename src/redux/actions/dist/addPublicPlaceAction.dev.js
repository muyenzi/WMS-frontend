"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPublicPlaceFailure = exports.addPublicPlaceSuccess = exports.addPublicPlaceRequest = exports.addPublicPlaceAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _addPublicPlaceTypes = require("../types/addPublicPlaceTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addPublicPlaceAction = function addPublicPlaceAction(details, navigate) {
  return function _callee(dispatch) {
    var provinceName, districtName, sectorName, cellName, villageName, publicPlaceName, publicPlaceSource, publicPlaceType, publicPlaceHowLong, Url, res, _ref, data, errorMessage;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch(addPublicPlaceRequest());
            console.log("ooppp", details);
            provinceName = details.provinceName;
            districtName = details.districtName;
            sectorName = details.sectorName;
            cellName = details.cellName;
            villageName = details.villageName;
            publicPlaceName = details.publicPlaceName;
            publicPlaceSource = details.publicPlaceSource;
            publicPlaceType = details.publicPlaceType;
            publicPlaceHowLong = details.publicPlaceHowLong;
            Url = 'http://localhost:8000/api/publicplaces/new-publicplace';
            _context.next = 15;
            return regeneratorRuntime.awrap(_axios["default"].post(Url, {
              name: publicPlaceName,
              source: publicPlaceSource,
              type: publicPlaceType,
              how_long: publicPlaceHowLong,
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
              dispatch(addPublicPlaceSuccess(data.message));
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
            dispatch(addPublicPlaceFailure(errorMessage));
            _context.next = 34;
            break;

          case 33:
            dispatch(addPublicPlaceFailure("Network Error"));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 24]]);
  };
};

exports.addPublicPlaceAction = addPublicPlaceAction;

var addPublicPlaceRequest = function addPublicPlaceRequest() {
  return {
    type: _addPublicPlaceTypes.ADD_PUBLICPLACE_REQUEST
  };
};

exports.addPublicPlaceRequest = addPublicPlaceRequest;

var addPublicPlaceSuccess = function addPublicPlaceSuccess(details) {
  return {
    type: _addPublicPlaceTypes.ADD_PUBLICPLACE_SUCCESS,
    payload: details
  };
};

exports.addPublicPlaceSuccess = addPublicPlaceSuccess;

var addPublicPlaceFailure = function addPublicPlaceFailure(error) {
  return {
    type: _addPublicPlaceTypes.ADD_PUBLICPLACE_FAILURE,
    payload: error
  };
};

exports.addPublicPlaceFailure = addPublicPlaceFailure;