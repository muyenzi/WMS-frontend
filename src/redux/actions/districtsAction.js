import axios from "axios";
import {
    DISTRICTS_REQUEST,
    DISTRICTS_SUCCESS,
    DISTRICTS_FAILURE,
  } from "../types/districtsTypes";
  

export const getDistrictsAction = (id) => async (dispatch) => {
  try {
    dispatch(getDistrictsRequest());
    const Url=`http://localhost:8000/api/districts/${id}`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getDistrictsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getDistrictsFailure(errorMessage));
    } else {
      dispatch(getDistrictsFailure("Network Error"));
    }
  }
};

export const getDistrictsRequest = () => {
  return {
    type: DISTRICTS_REQUEST,
  };
};

export const getDistrictsSuccess = (details) => {
  return {
    type: DISTRICTS_SUCCESS,
    payload: details,
  };
};
export const getDistrictsFailure = (error) => {
  return {
    type: DISTRICTS_FAILURE,
    payload: error,
  };
};