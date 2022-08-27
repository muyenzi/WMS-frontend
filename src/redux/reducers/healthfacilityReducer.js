import {
    HEALTHFACILITIES_REQUEST,
    HEALTHFACILITIES_SUCCESS,
    HEALTHFACILITIES_FAILURE,
  } from "../types/healthfacilityTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case HEALTHFACILITIES_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case HEALTHFACILITIES_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case HEALTHFACILITIES_FAILURE:
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