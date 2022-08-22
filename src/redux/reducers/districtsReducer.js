import {
    DISTRICTS_REQUEST,
    DISTRICTS_SUCCESS,
    DISTRICTS_FAILURE,
  } from "../types/districtsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DISTRICTS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case DISTRICTS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case DISTRICTS_FAILURE:
        return {
          loading: false,
          details: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;