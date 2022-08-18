import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const allReducers = combineReducers({
    userLogin:loginReducer,
});

export default allReducers;