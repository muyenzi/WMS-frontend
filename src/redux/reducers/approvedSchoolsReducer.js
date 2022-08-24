import {
    APPROVED_SCHOOLS_REQUEST,
    APPROVED_SCHOOLS_SUCCESS,
    APPROVED_SCHOOLS_FAILURE,
  } from "../types/approvedSchoolsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case APPROVED_SCHOOLS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case APPROVED_SCHOOLS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case APPROVED_SCHOOLS_FAILURE:
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