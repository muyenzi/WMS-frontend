import axios from "axios";
import {
    HEALTHFACILITIES_REQUEST,
    HEALTHFACILITIES_SUCCESS,
    HEALTHFACILITIES_FAILURE,
  } from "../types/healthfacilityTypes";

export const getHealthfacilitiesAction = () => async (dispatch) => {
  try {
    dispatch(getHealthfacilitiesRequest());
    const Url=`http://localhost:8000/api/healthfacilities`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getHealthfacilitiesSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getHealthfacilitiesFailure(errorMessage));
    } else {
      dispatch(getHealthfacilitiesFailure("Network Error"));
    }
  }
};

export const getHealthfacilitiesRequest = () => {
  return {
    type: HEALTHFACILITIES_REQUEST,
  };
};

export const getHealthfacilitiesSuccess = (details) => {
  return {
    type: HEALTHFACILITIES_SUCCESS,
    payload: details,
  };
};
export const getHealthfacilitiesFailure = (error) => {
  return {
    type: HEALTHFACILITIES_FAILURE,
    payload: error,
  };
};