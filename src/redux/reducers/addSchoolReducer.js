import {
    ADD_SCHOOL_REQUEST,
    ADD_SCHOOL_SUCCESS,
    ADD_SCHOOL_FAILURE,
  } from "../types/addSchoolTypes";
  
  const initialState = {
    loading: false,
    schools: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_SCHOOL_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ADD_SCHOOL_SUCCESS:
        return {
          loading: false,
          schools: action.payload,
          error: "",
        };
      case ADD_SCHOOL_FAILURE:
        return {
          loading: false,
          schools: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;