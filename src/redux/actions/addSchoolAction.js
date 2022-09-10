import axios from "axios";

import {
    ADD_SCHOOL_REQUEST,
    ADD_SCHOOL_SUCCESS,
    ADD_SCHOOL_FAILURE,
  } from "../types/addSchoolTypes";

export const addSchoolAction = (details,navigate) => async (dispatch) => {
  try {
    dispatch(addSchoolRequest());
   // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel
    const {provinceName}=details
    const {districtName}=details
    const {sectorName}=details
    const {cellName}=details
    const {villageName}=details
    const {schoolName}=details
   const {schoolSource}=details
    const {schoolFrequency}=details
    const {schoolHowLong}=details
    const {schoolLevel}=details
    const Url='http://localhost:8000/api/schools/new-chool';
   const res = await axios.post(Url,{
    name:schoolName,
    source:schoolSource,
    frequency:schoolFrequency,
    how_long:schoolHowLong,
    level:schoolLevel,
    prov_name:provinceName.replaceAll(/\s/g, ''),
    dis_name:districtName.replaceAll(/\s/g, ''),
    sec_name:sectorName.replaceAll(/\s/g, ''),
    cell_name:cellName.replaceAll(/\s/g, ''),
    vil_name:villageName.replaceAll(/\s/g, '')
   });
    const {data} = await res;
   console.log(data)
      if(data.responseCode===200){
      dispatch(addSchoolSuccess(data.message));
    
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(addSchoolFailure(errorMessage));
    } else {
      dispatch(addSchoolFailure("Network Error"));
    }
  }
};

export const addSchoolRequest = () => {
  return {
    type: ADD_SCHOOL_REQUEST,
  };
};

export const addSchoolSuccess = (schools) => {
  return {
    type: ADD_SCHOOL_SUCCESS,
    payload: schools,
  };
};
export const addSchoolFailure = (error) => {
  return {
    type: ADD_SCHOOL_FAILURE,
    payload: error,
  };
};