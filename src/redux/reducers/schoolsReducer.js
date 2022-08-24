import {
    SCHOOLS_REQUEST,
    SCHOOLS_SUCCESS,
    SCHOOLS_FAILURE,
  } from "../types/schoolsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SCHOOLS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case SCHOOLS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case SCHOOLS_FAILURE:
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