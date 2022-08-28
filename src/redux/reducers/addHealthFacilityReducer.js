import {
    ADD_HEALTHFACILITY_REQUEST,
    ADD_HEALTHFACILITY_SUCCESS,
    ADD_HEALTHFACILITY_FAILURE,
  } from "../types/addHealthFacilityTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_HEALTHFACILITY_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ADD_HEALTHFACILITY_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case ADD_HEALTHFACILITY_FAILURE:
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