import {
    REJECTED_SCHOOLS_REQUEST,
    REJECTED_SCHOOLS_SUCCESS,
    REJECTED_SCHOOLS_FAILURE,
  } from "../types/rejectedSchoolsTypes";
  
  const initialState = {
    loading: false,
    schools: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case REJECTED_SCHOOLS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case REJECTED_SCHOOLS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case REJECTED_SCHOOLS_FAILURE:
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