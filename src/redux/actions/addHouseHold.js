import axios from "axios";

import {
    ADD_HOUSEHOLD_REQUEST,
    ADD_HOUSEHOLD_SUCCESS,
    ADD_HOUSEHOLD_FAILURE,
  } from "../types/addHouseHoldTypes";
export const addHouseHoldAction = (details,navigate) => async (dispatch) => {
  try {
    dispatch(addHouseHoldRequest());
   // provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel
    const {provinceName}=details
    const {districtName}=details
    const {sectorName}=details
    const {cellName}=details
    const {villageName}=details
    const {householdPhone}=details
    const  {householdSource}=details
    const {householdFrequency}=details
    const {householdHowLong}=details

    const Url='http://localhost:8000/api/households/new-household';
   const res = await axios.post(Url,{
    phoneNumber:householdPhone,
    source:householdSource,
    frequency:householdFrequency,
    how_long:householdHowLong, 
    prov_name:provinceName.replaceAll(/\s/g, ''),
    dis_name:districtName.replaceAll(/\s/g, ''),
    sec_name:sectorName.replaceAll(/\s/g, ''),
    cell_name:cellName.replaceAll(/\s/g, ''),
    vil_name:villageName.replaceAll(/\s/g, '')
   });
    const {data} = await res;
   console.log(data)
      if(data.responseCode===200){
      dispatch(addHouseHoldSuccess(data.message));
    
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(addHouseHoldFailure(errorMessage));
    } else {
      dispatch(addHouseHoldFailure("Network Error"));
    }
  }
};

export const addHouseHoldRequest = () => {
  return {
    type: ADD_HOUSEHOLD_REQUEST,
  };
};

export const addHouseHoldSuccess = (details) => {
  return {
    type: ADD_HOUSEHOLD_SUCCESS,
    payload: details,
  };
};
export const addHouseHoldFailure = (error) => {
  return {
    type: ADD_HOUSEHOLD_FAILURE,
    payload: error,
  };
};