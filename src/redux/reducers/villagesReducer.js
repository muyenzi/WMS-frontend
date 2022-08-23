import {
    VILLAGES_REQUEST,
    VILLAGES_SUCCESS,
    VILLAGES_FAILURE,
  } from "../types/villagesTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case VILLAGES_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case VILLAGES_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case VILLAGES_FAILURE:
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