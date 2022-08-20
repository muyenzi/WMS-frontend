import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginTypes";


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
   });
    const {data} = await res;
   
      if(data.status===200){
      const token=res.data.data.token
      const email=res.data.data.user
     const role= res.data.data.role
    const fullName=res.data.data.fullName
      const userData={email,role,fullName}
      console.log("object",email,role,userData)
      dispatch(loginSuccess(data));
      if(role==="SuperAdmin" || role==="Admin" || role=="User"){
        navigate('/dashboard/app', { replace: true });
      return (localStorage.setItem('wmsAuth',token),localStorage.setItem('userAuth',JSON.stringify(userData)));
      }
      else{
        navigate('/dashboard/organizations', { replace: true });
        return (localStorage.setItem('wmsAuth',token),localStorage.setItem('userAuth',userData));
      }
    
      }
 
    

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