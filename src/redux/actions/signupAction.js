import axios from "axios";
import { replace } from "lodash";
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from "../types/signupTypes";


export const signupAction = (user,navigate) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const {email}=user
    const {authCode}=user 
    const {password}=user
    const Url='http://localhost:8000/api/auth/signup';
   const res = await axios.post(Url,{
    email:email,
    authCode:authCode,
    password:password
   });
    const {data} = await res;
   console.log(data)
      if(data.status===200){
      dispatch(signupSuccess(data.message));
      navigate('/login', { replace: true });
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(signupFailure(errorMessage));
    } else {
      dispatch(signupFailure("Network Error"));
    }
  }
};

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signupSuccess = (users) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: users,
  };
};
export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};