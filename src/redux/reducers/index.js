import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./getUsersReducer";
import addUserReducer from "./addUserReducer";
import signupReducer from "./signupReducer";
import provincesReducer from "./provincesReducer";
import districtReducer from "./districtsReducer";
import addSchoolReducer from "./addSchoolReducer";
import sectorsReducer from "./sectorsReducer";
import cellsReducer from "./cellsReducer";
import villagesReducer from "./villagesReducer";
import rejectedSchoolsReducer from "./rejectedSchoolsReducer";
import schoolsReducer from "./schoolsReducer";
import approvedSchoolsReducer from "./approvedSchoolsReducer";
const allReducers = combineReducers({
    userLogin:loginReducer,
    getUsers:usersReducer,
    addUser:addUserReducer,
    signup:signupReducer,
    getProvinces:provincesReducer,
    getDistricts:districtReducer,
    addSchool:addSchoolReducer,
    getSectors:sectorsReducer,
    getCells:cellsReducer,
    getVillages:villagesReducer,
    rejectedSchools:rejectedSchoolsReducer,
    getSchools:schoolsReducer,
    approvedSchools:approvedSchoolsReducer,
});

export default allReducers;