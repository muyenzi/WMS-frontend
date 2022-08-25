import {
    ADD_HOUSEHOLD_REQUEST,
    ADD_HOUSEHOLD_SUCCESS,
    ADD_HOUSEHOLD_FAILURE,
  } from "../types/addHouseHoldTypes";
  
  const initialState = {
    loading: false,
    detailss: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_HOUSEHOLD_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ADD_HOUSEHOLD_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case ADD_HOUSEHOLD_FAILURE:
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