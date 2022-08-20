import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from "../types/signupTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case SIGNUP_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case SIGNUP_FAILURE:
        return {
          loading: false,
          users: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;