import axios from "axios";
import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
  } from "../types/addUserTypes";


export const addUserAction = (user,navigate) => async (dispatch) => {
  try {
    dispatch(addUserRequest());
    const {fullname}=user
    const {role}=user 
  console.log("jjj",fullname,role)
    const Url='http://localhost:8000/api/auth/new-user';
   const res = await axios.post(Url,{
    fullname:fullname,
    role:role
   });
    const {data} = await res;
   console.log(data)
      if(data.status===200){
      dispatch(addUserSuccess(data.message));
    
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(addUserFailure(errorMessage));
    } else {
      dispatch(addUserFailure("Network Error"));
    }
  }
};

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

export const addUserSuccess = (users) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: users,
  };
};
export const addUserFailure = (error) => {
  return {
    type: ADD_USER_FAILURE,
    payload: error,
  };
};