import {
    ADD_PUBLICPLACE_REQUEST,
    ADD_PUBLICPLACE_SUCCESS,
    ADD_PUBLICPLACE_FAILURE,
  } from "../types/addPublicPlaceTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PUBLICPLACE_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ADD_PUBLICPLACE_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case ADD_PUBLICPLACE_FAILURE:
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