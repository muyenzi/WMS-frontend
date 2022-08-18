import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./getUsersReducer";

const allReducers = combineReducers({
    userLogin:loginReducer,
    getUsers:usersReducer,
});

export default allReducers;