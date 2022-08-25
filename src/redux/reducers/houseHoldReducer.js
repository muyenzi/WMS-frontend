import {
    HOUSEHOLDS_REQUEST,
    HOUSEHOLDS_SUCCESS,
    HOUSEHOLDS_FAILURE,
  } from "../types/houseHoldTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case HOUSEHOLDS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case HOUSEHOLDS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case HOUSEHOLDS_FAILURE:
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