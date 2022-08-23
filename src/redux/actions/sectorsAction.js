import axios from "axios";
import {
    SECTORS_REQUEST,
    SECTORS_SUCCESS,
    SECTORS_FAILURE,
  } from "../types/sectorsTypes";
  

export const getSectorsAction = (id) => async (dispatch) => {
  try {
    dispatch(getSectorsRequest());
    const Url=`http://localhost:8000/api/sectors/${id}`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getSectorsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getSectorsFailure(errorMessage));
    } else {
      dispatch(getSectorsFailure("Network Error"));
    }
  }
};

export const getSectorsRequest = () => {
  return {
    type: SECTORS_REQUEST,
  };
};

export const getSectorsSuccess = (details) => {
  return {
    type: SECTORS_SUCCESS,
    payload: details,
  };
};
export const getSectorsFailure = (error) => {
  return {
    type: SECTORS_FAILURE,
    payload: error,
  };
};