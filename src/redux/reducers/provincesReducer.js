import {
    PROVINCES_REQUEST,
    PROVINCES_SUCCESS,
    PROVINCES_FAILURE,
  } from "../types/provincesTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case PROVINCES_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case PROVINCES_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case PROVINCES_FAILURE:
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