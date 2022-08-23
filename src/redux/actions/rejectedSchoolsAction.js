import axios from "axios";
import {
    REJECTED_SCHOOLS_REQUEST,
    REJECTED_SCHOOLS_SUCCESS,
    REJECTED_SCHOOLS_FAILURE,
  } from "../types/rejectedSchoolsTypes";

export const getRejectedSchoolsAction = () => async (dispatch) => {
  try {
    dispatch(getRejectedSchoolsRequest());
    const Url='http://localhost:8000/api/schools/rejectedschools';
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getRejectedSchoolsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getRejectedSchoolsFailure(errorMessage));
    } else {
      dispatch(getRejectedSchoolsFailure("Network Error"));
    }
  }
};

export const getRejectedSchoolsRequest = () => {
  return {
    type: REJECTED_SCHOOLS_REQUEST,
  };
};

export const getRejectedSchoolsSuccess = (details) => {
  return {
    type: REJECTED_SCHOOLS_SUCCESS,
    payload: details,
  };
};
export const getRejectedSchoolsFailure = (error) => {
  return {
    type: REJECTED_SCHOOLS_FAILURE,
    payload: error,
  };
};