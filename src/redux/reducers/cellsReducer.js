import {
    CELLS_REQUEST,
    CELLS_SUCCESS,
    CELLS_FAILURE,
  } from "../types/cellsTypes";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CELLS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case CELLS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CELLS_FAILURE:
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