import axios from "axios";
import {
    SCHOOLS_REQUEST,
    SCHOOLS_SUCCESS,
    SCHOOLS_FAILURE,
  } from "../types/schoolsTypes";
  

export const getSchoolsAction = () => async (dispatch) => {
  try {
    dispatch(getSchoolsRequest());
    const Url=`http://localhost:8000/api/schools`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getSchoolsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getSchoolsFailure(errorMessage));
    } else {
      dispatch(getSchoolsFailure("Network Error"));
    }
  }
};

export const getSchoolsRequest = () => {
  return {
    type: SCHOOLS_REQUEST,
  };
};

export const getSchoolsSuccess = (details) => {
  return {
    type: SCHOOLS_SUCCESS,
    payload: details,
  };
};
export const getSchoolsFailure = (error) => {
  return {
    type: SCHOOLS_FAILURE,
    payload: error,
  };
};