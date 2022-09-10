import axios from "axios";

import {
    ADD_PUBLICPLACE_REQUEST,
    ADD_PUBLICPLACE_SUCCESS,
    ADD_PUBLICPLACE_FAILURE,
  } from "../types/addPublicPlaceTypes";
export const addPublicPlaceAction = (details,navigate) => async (dispatch) => {
  try {
    dispatch(addPublicPlaceRequest());
console.log("ooppp",details)
 
    const {provinceName}=details
    const {districtName}=details
    const {sectorName}=details
    const {cellName}=details
    const {villageName}=details
    const {publicPlaceName}=details
   const  {publicPlaceSource}=details
    const {publicPlaceType}=details
    const {publicPlaceHowLong}=details

    const Url='http://localhost:8000/api/publicplaces/new-publicplace';
   const res = await axios.post(Url,{
    name:publicPlaceName,
    source:publicPlaceSource,
    type:publicPlaceType,
    how_long:publicPlaceHowLong, 
    prov_name:provinceName.replaceAll(/\s/g, ''),
    dis_name:districtName.replaceAll(/\s/g, ''),
    sec_name:sectorName.replaceAll(/\s/g, ''),
    cell_name:cellName.replaceAll(/\s/g, ''),
    vil_name:villageName.replaceAll(/\s/g, '')

   });
    const {data} = await res;
   console.log(data)
      if(data.responseCode===200){
      dispatch(addPublicPlaceSuccess(data.message));
    
      }

  } catch (err) {
    if (err.response) {
    const errorMessage = await err.response.data.message;
      //const errorMessage = 'Invalid Username or Pin'
      dispatch(addPublicPlaceFailure(errorMessage));
    } else {
      dispatch(addPublicPlaceFailure("Network Error"));
    }
  }
};

export const addPublicPlaceRequest = () => {
  return {
    type: ADD_PUBLICPLACE_REQUEST,
  };
};

export const addPublicPlaceSuccess = (details) => {
  return {
    type: ADD_PUBLICPLACE_SUCCESS,
    payload: details,
  };
};
export const addPublicPlaceFailure = (error) => {
  return {
    type: ADD_PUBLICPLACE_FAILURE,
    payload: error,
  };
};