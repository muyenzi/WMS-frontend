import axios from "axios";

import {
    ADD_HEALTHFACILITY_REQUEST,
    ADD_HEALTHFACILITY_SUCCESS,
    ADD_HEALTHFACILITY_FAILURE,
  } from "../types/addHealthFacilityTypes";
export const addHealthFacilityAction = (details,navigate) => async (dispatch) => {
  try {
    dispatch(addHealthFacilityRequest());
console.log("ooppp",details)
   // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel
    const {provinceName}=details
    const {districtName}=details
    const {sectorName}=details
    const {cellName}=details
    const {villageName}=details
    const {healthfacilityName}=details
   const  {healthfacilitySource}=details
    const {healthfacilityType}=details
    const {healthfacilityHowLong}=details

    const Url='http://localhost:8000/api/healthfacilities/new-healthfacility';
   const res = await axios.post(Url,{
    name:healthfacilityName,
    source:healthfacilitySource,
    type:healthfacilityType,
    how_long:healthfacilityHowLong, 
    prov_name:provinceName.replaceAll(/\s/g, ''),
    dis_name:districtName.replaceAll(/\s/g, ''),
    sec_name:sectorName.replaceAll(/\s/g, ''),
    cell_name:cellName.replaceAll(/\s/g, ''),
    vil_name:villageName.replaceAll(/\s/g, '')

   });
    const {data} = await res;
   console.log(data)
      if(data.responseCode===200){
      dispatch(addHealthFacilitySuccess(data.message));
    
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(addHealthFacilityFailure(errorMessage));
    } else {
      dispatch(addHealthFacilityFailure("Network Error"));
    }
  }
};

export const addHealthFacilityRequest = () => {
  return {
    type: ADD_HEALTHFACILITY_REQUEST,
  };
};

export const addHealthFacilitySuccess = (details) => {
  return {
    type: ADD_HEALTHFACILITY_SUCCESS,
    payload: details,
  };
};
export const addHealthFacilityFailure = (error) => {
  return {
    type: ADD_HEALTHFACILITY_FAILURE,
    payload: error,
  };
};