import axios from "axios";
import {
    HOUSEHOLDS_REQUEST,
    HOUSEHOLDS_SUCCESS,
    HOUSEHOLDS_FAILURE,
  } from "../types/houseHoldTypes";

export const getHouseholdsAction = () => async (dispatch) => {
  try {
    dispatch(getHouseholdsRequest());
    const Url=`http://localhost:8000/api/households`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getHouseholdsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getHouseholdsFailure(errorMessage));
    } else {
      dispatch(getHouseholdsFailure("Network Error"));
    }
  }
};

export const getHouseholdsRequest = () => {
  return {
    type: HOUSEHOLDS_REQUEST,
  };
};

export const getHouseholdsSuccess = (details) => {
  return {
    type: HOUSEHOLDS_SUCCESS,
    payload: details,
  };
};
export const getHouseholdsFailure = (error) => {
  return {
    type: HOUSEHOLDS_FAILURE,
    payload: error,
  };
};