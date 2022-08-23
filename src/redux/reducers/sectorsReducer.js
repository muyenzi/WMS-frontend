import {
    SECTORS_REQUEST,
    SECTORS_SUCCESS,
    SECTORS_FAILURE,
  } from "../types/sectorsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SECTORS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case SECTORS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case SECTORS_FAILURE:
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