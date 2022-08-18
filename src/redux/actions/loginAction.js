import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";
  
  // import jwt from "jsonwebtoken";
  // import dotenv from "dotenv";
  // dotenv.config();


export const loginAction = (user,navigate) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {email}=user
    const {password}=user 
    
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://localhost:8000/api/auth/login';
   const res = await axios.post(Url,{
    email:email,
    password:password
//    }, {
//      withCredentials: true,
//     headers:{
//     "Accept":"application/json",
//     "Content-Type": "application/json",
//   //'Authorization': + basicAuth,
//  },
 
   });
    const {data} = await res;
      dispatch(loginSuccess(data));
      navigate('/dashboard/app', { replace: true });
    

  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(loginFailure(errorMessage));
    } else {
      dispatch(loginFailure("Network Error"));
    }
  }
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};