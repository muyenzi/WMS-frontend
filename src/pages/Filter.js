import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useEffect,useState} from 'react';
import axios from 'axios'


export default function SelectTextFields() {

  const [province,setProvince]=useState('')
  const [provinceName,setProvinceName]=useState('')
  const [provincesData,setProvincesData]=useState([]);

  const [districtsData,setDistrictsData]=useState([]); 
  const [district,setDistrict]=useState('')
  const [districtName,setDistrictName]=useState('')

  const [sectorsData,setSectorsData]=useState([]);
 const  [sector,setSector]=useState('')
 const [sectorName,setSectorName]=useState('');

 const [cellsData,setCellsData]=useState([]);
 const [cell,setCell]=useState('');
 const [cellName,setCellName]=useState('')

 const [ villagesData,setVillagesData]=useState([])
 const [village,setVillage]=useState('')
 const [villageName,setVillageName]=useState('')

  useEffect(()=>{
    async function fetchProvinces(){
await axios.get('http://localhost:8000/api/provinces').then((response)=>{
    setProvincesData(response.data.data)

  
}).catch((error)=>{
    console.log(error)
})}
    
    fetchProvinces()
  },[])

  console.log("province name::",provinceName,districtName,sectorName,cellName,villageName)
  const handleChange =async (event) => {
    setProvince(event.target.value);
    provincesData.map((p)=>{
      if(p.id===event.target.value){
        setProvinceName(p.Provinces)
        
      }
    })
    if(event.target.value){
        await axios.get(`http://localhost:8000/api/districts/${event.target.value}`).then((response)=>{
            setDistrictsData(response.data.data)
}).catch((error)=>{
    console.log(error)
})
    }
   
  };


  const handleDistrictChange =async (event) => {
    setDistrict(event.target.value);
    districtsData.map((p)=>{
      if(p.id===event.target.value){
        setDistrictName(p.Districts)   
      }
    });
    if(event.target.value){
        await axios.get(`http://localhost:8000/api/sectors/${event.target.value}`).then((response)=>{
            setSectorsData(response.data.data)
            
}).catch((error)=>{
    console.log(error)
})}


};




const handleSectorChange =async (event) => {
    setSector(event.target.value);
    sectorsData.map((p)=>{
      if(p.id===event.target.value){
        setSectorName(p.Sectors)   
      }
    });
     if(event.target.value){
         await axios.get(`http://localhost:8000/api/cells/${event.target.value}`).then((response)=>{
             setCellsData(response.data.data)
          
 }).catch((error)=>{
     console.log(error)
 })}

};


const handleCellChange =async (event) => {
    setCell(event.target.value);
    cellsData.map((p)=>{
      if(p.id===event.target.value){
        setCellName(p.Cells)
        
      }
    })
    if(event.target.value){
        await axios.get(`http://localhost:8000/api/villages/${event.target.value}`).then((response)=>{
            setVillagesData(response.data.data);  
            setVillage(event.target.value);
      
}).catch((error)=>{
    console.log(error)
})}

};

const handleVillageChange =async (event) => {
    setVillage(event.target.value);
    villagesData.map((p)=>{
      if(p.id===event.target.value){
        setVillageName(p.villages)
        
      }
    })

};
 

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        <TextField
          id="standard-select-currency"
          select
          label=""
          value={province}
          name={province}
          onChange={handleChange}
          helperText="Please select your province"
          variant="standard"
        >
          {provincesData.map((option) => (
            <MenuItem key={option.id} value={option.id} name={option.Provinces} >
              {option.Provinces}
            </MenuItem>
          ))}
        </TextField>
        
          <TextField
          id="standard-select-currency-native"
          select
          label=""
          value={district}
          name={district}
          onChange={handleDistrictChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your district"
          variant="standard"
        >
          {districtsData.map((option) => (
            <option key={option.id} value={option.id} name={option.Districts}>
              {option.Districts}
            </option>
          ))}
        </TextField>
      
        <TextField
        id="standard-select-currency-native"
        select
        label=""
        value={sector}
        name={sector}
        onChange={handleSectorChange}
        SelectProps={{
          native: true,
        }}
        helperText="Please select your sector"
        variant="standard"
      >
        {sectorsData.map((option) => (
          <option key={option.id} value={option.id} name={option.Sectors}>
            {option.Sectors}
          </option>
        ))}
      </TextField>
      <TextField
      id="standard-select-currency-native"
      select
      label=""
      value={cell}
      name={cell}
      onChange={handleCellChange}
      SelectProps={{
        native: true,
      }}
      helperText="Please select your cell"
      variant="standard"
    >
      {cellsData.map((option) => (
        <option key={option.id} value={option.id} name={option.Cells}>
          {option.Cells}
        </option>
      ))}
    </TextField>

    <TextField
    id="standard-select-currency-native"
    select
    label=""
    value={village}
    name={village}
    onChange={handleVillageChange}
    SelectProps={{
      native: true,
    }}
    helperText="Please select your village"
    variant="standard"
  >
    {villagesData.map((option) => (
      <option key={option.id} value={option.id} name={option.villages}>
        {option.villages}
      </option>
    ))}
  </TextField>
      </div>
    </Box>
  );
}
