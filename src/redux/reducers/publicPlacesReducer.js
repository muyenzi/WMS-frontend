import {
    PUBLICPLACE_REQUEST,
    PUBLICPLACE_SUCCESS,
    PUBLICPLACE_FAILURE,
  } from "../types/publicPlacesTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case PUBLICPLACE_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case PUBLICPLACE_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case PUBLICPLACE_FAILURE:
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