import axios from "axios";
import {
    PUBLICPLACE_REQUEST,
    PUBLICPLACE_SUCCESS,
    PUBLICPLACE_FAILURE,
  } from "../types/publicPlacesTypes";

export const getPublicPlacesAction = () => async (dispatch) => {
  try {
    dispatch(getPublicPlacesRequest());
    const Url=`http://localhost:8000/api/publicplaces`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getPublicPlacesSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getPublicPlacesFailure(errorMessage));
    } else {
      dispatch(getPublicPlacesFailure("Network Error"));
    }
  }
};

export const getPublicPlacesRequest = () => {
  return {
    type: PUBLICPLACE_REQUEST,
  };
};

export const getPublicPlacesSuccess = (details) => {
  return {
    type: PUBLICPLACE_SUCCESS,
    payload: details,
  };
};
export const getPublicPlacesFailure = (error) => {
  return {
    type: PUBLICPLACE_FAILURE,
    payload: error,
  };
};