import axios from "axios";
import {
    CELLS_REQUEST,
    CELLS_SUCCESS,
    CELLS_FAILURE,
  } from "../types/cellsTypes";
  

export const getCellsAction = (id) => async (dispatch) => {
  try {
    dispatch(getCellsRequest());
    const Url=`http://localhost:8000/api/cells/${id}`;
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getCellsSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getCellsFailure(errorMessage));
    } else {
      dispatch(getCellsFailure("Network Error"));
    }
  }
};

export const getCellsRequest = () => {
  return {
    type: CELLS_REQUEST,
  };
};

export const getCellsSuccess = (details) => {
  return {
    type: CELLS_SUCCESS,
    payload: details,
  };
};
export const getCellsFailure = (error) => {
  return {
    type: CELLS_FAILURE,
    payload: error,
  };
};