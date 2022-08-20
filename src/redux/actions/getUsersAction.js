import axios from "axios";
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
  } from "../types/getUsersTypes";
  

export const getUsersAction = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const Url='http://localhost:8000/api/auth/users';
   const res = await axios.get(Url);
    const {data} = await res;
      dispatch(getUsersSuccess(data.data));

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      
      dispatch(getUsersFailure(errorMessage));
    } else {
      dispatch(getUsersFailure("Network Error"));
    }
  }
};

export const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};
export const getUsersFailure = (error) => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};