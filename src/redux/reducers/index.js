import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./getUsersReducer";
import addUserReducer from "./addUserReducer";
import signupReducer from "./signupReducer";

const allReducers = combineReducers({
    userLogin:loginReducer,
    getUsers:usersReducer,
    addUser:addUserReducer,
    signup:signupReducer,
});

export default allReducers;