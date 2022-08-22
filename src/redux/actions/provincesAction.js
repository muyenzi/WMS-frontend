import axios from "axios";
import {
    PROVINCES_REQUEST,
    PROVINCES_SUCCESS,
    PROVINCES_FAILURE,
  } from "../types/provincesTypes";
  

export const getProvincesAction = () => async (dispatch) => {
  try {
    dispatch(getProvincesRequest());
    const Url='http://localhost:8000/api/provinces';
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getProvincesSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getProvincesFailure(errorMessage));
    } else {
      dispatch(getProvincesFailure("Network Error"));
    }
  }
};

export const getProvincesRequest = () => {
  return {
    type: PROVINCES_REQUEST,
  };
};

export const getProvincesSuccess = (details) => {
  return {
    type: PROVINCES_SUCCESS,
    payload: details,
  };
};
export const getProvincesFailure = (error) => {
  return {
    type: PROVINCES_FAILURE,
    payload: error,
  };
};