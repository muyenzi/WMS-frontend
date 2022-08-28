"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _loginReducer = _interopRequireDefault(require("./loginReducer"));

var _getUsersReducer = _interopRequireDefault(require("./getUsersReducer"));

var _addUserReducer = _interopRequireDefault(require("./addUserReducer"));

var _signupReducer = _interopRequireDefault(require("./signupReducer"));

var _provincesReducer = _interopRequireDefault(require("./provincesReducer"));

var _districtsReducer = _interopRequireDefault(require("./districtsReducer"));

var _addSchoolReducer = _interopRequireDefault(require("./addSchoolReducer"));

var _sectorsReducer = _interopRequireDefault(require("./sectorsReducer"));

var _cellsReducer = _interopRequireDefault(require("./cellsReducer"));

var _villagesReducer = _interopRequireDefault(require("./villagesReducer"));

var _rejectedSchoolsReducer = _interopRequireDefault(require("./rejectedSchoolsReducer"));

var _schoolsReducer = _interopRequireDefault(require("./schoolsReducer"));

var _approvedSchoolsReducer = _interopRequireDefault(require("./approvedSchoolsReducer"));

var _addHouseHoldReducer = _interopRequireDefault(require("./addHouseHoldReducer"));

var _houseHoldReducer = _interopRequireDefault(require("./houseHoldReducer"));

var _healthfacilityReducer = _interopRequireDefault(require("./healthfacilityReducer"));

var _addHealthFacilityReducer = _interopRequireDefault(require("./addHealthFacilityReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allReducers = (0, _redux.combineReducers)({
  userLogin: _loginReducer["default"],
  getUsers: _getUsersReducer["default"],
  addUser: _addUserReducer["default"],
  signup: _signupReducer["default"],
  getProvinces: _provincesReducer["default"],
  getDistricts: _districtsReducer["default"],
  addSchool: _addSchoolReducer["default"],
  getSectors: _sectorsReducer["default"],
  getCells: _cellsReducer["default"],
  getVillages: _villagesReducer["default"],
  rejectedSchools: _rejectedSchoolsReducer["default"],
  getSchools: _schoolsReducer["default"],
  approvedSchools: _approvedSchoolsReducer["default"],
  addHouseHold: _addHouseHoldReducer["default"],
  getHouseHolds: _houseHoldReducer["default"],
  getHealthfacilities: _healthfacilityReducer["default"],
  addHealthFacility: _addHealthFacilityReducer["default"]
});
var _default = allReducers;
exports["default"] = _default;