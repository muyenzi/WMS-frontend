import axios from "axios";
import {
    APPROVED_SCHOOLS_REQUEST,
    APPROVED_SCHOOLS_SUCCESS,
    APPROVED_SCHOOLS_FAILURE,
  } from "../types/approvedSchoolsTypes";

export const getAprrovedSchoolsAction = () => async (dispatch) => {
  try {
    dispatch(getApprovedSchoolsRequest());
    const Url='http://localhost:8000/api/schools/approvedschools';
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getApprovedSchoolsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getApprovedSchoolsFailure(errorMessage));
    } else {
      dispatch(getApprovedSchoolsFailure("Network Error"));
    }
  }
};

export const getApprovedSchoolsRequest = () => {
  return {
    type: APPROVED_SCHOOLS_REQUEST,
  };
};

export const getApprovedSchoolsSuccess = (details) => {
  return {
    type: APPROVED_SCHOOLS_SUCCESS,
    payload: details,
  };
};
export const getApprovedSchoolsFailure = (error) => {
  return {
    type: APPROVED_SCHOOLS_FAILURE,
    payload: error,
  };
};