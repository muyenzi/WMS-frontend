import axios from "axios";
import {
    VILLAGES_REQUEST,
    VILLAGES_SUCCESS,
    VILLAGES_FAILURE,
  } from "../types/villagesTypes";

export const getVillagesAction = (id) => async (dispatch) => {
  try {
    dispatch(getVillagesRequest());
    const Url=`http://localhost:8000/api/villages/${id}`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getVillagesSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getVillagesFailure(errorMessage));
    } else {
      dispatch(getVillagesFailure("Network Error"));
    }
  }
};

export const getVillagesRequest = () => {
  return {
    type: VILLAGES_REQUEST,
  };
};

export const getVillagesSuccess = (details) => {
  return {
    type: VILLAGES_SUCCESS,
    payload: details,
  };
};
export const getVillagesFailure = (error) => {
  return {
    type: VILLAGES_FAILURE,
    payload: error,
  };
};