import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
  } from "../types/addUserTypes";
  
  const initialState = {
    loading: false,
    users: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ADD_USER_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: "",
        };
      case ADD_USER_FAILURE:
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