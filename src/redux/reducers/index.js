import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./getUsersReducer";
import addUserReducer from "./addUserReducer";
import signupReducer from "./signupReducer";
import provincesReducer from "./provincesReducer";
import districtReducer from "./districtsReducer";
import addSchoolReducer from "./addSchoolReducer";

const allReducers = combineReducers({
    userLogin:loginReducer,
    getUsers:usersReducer,
    addUser:addUserReducer,
    signup:signupReducer,
    getProvinces:provincesReducer,
    getDistricts:districtReducer,
    addSchool:addSchoolReducer,
});

export default allReducers;