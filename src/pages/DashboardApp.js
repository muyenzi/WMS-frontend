import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography,Container, Grid,CardHeader, CardContent, Button } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import React, {useEffect,useState} from "react";
// ----------------------------------------------------------------------
import {useSelector,useDispatch} from "react-redux";
import { getDistrictsAction } from '../redux/actions/districtsAction';
import { getProvincesAction } from '../redux/actions/provincesAction';
import { getSectorsAction } from '../redux/actions/sectorsAction';
import { getCellsAction } from '../redux/actions/cellsAction';
import { getVillagesAction } from '../redux/actions/villagesAction';
import { addSchoolAction } from '../redux/actions/addSchoolAction';
import { addHouseHoldAction } from '../redux/actions/addHouseHold';
import { addHealthFacilityAction } from '../redux/actions/addHealthFacilityAction';
import Collapse from "@mui/material/Collapse";
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton} from '@mui/material';
import axios from "axios"
const healthFacilitySources =[
  {
  values:"a piped water source",
  label:"a piped water source",
},
{
  values:"an improved source",
  label:"an improved source",
},
{
  values:"surface water",
  label:"surface water",
},

]
const healthFacilityHowLongs =[
  {
  values:"less than 30 minutes round trip",
  label:"less than 30 minutes round trip",
},
{
  values:"more than 30 minutes round trip",
  label:"more than 30 minutes round trip",
}

]

const healthFacilityTypes =[
  {
  values:"hospital",
  label:"hospital",
},
{
  values:"Health center",
  label:"Health center",
},
{
  values:"Health post",
  label:"Health post",
},
{
  values:"Polyclinic",
  label:"Polyclinic",
},
{
  values:"Clinic",
  label:"Clinic",
},


]

const schoolsLevels =[
  {
  values:"Pre-primary",
  label:"Pre-primary",
},
{
  values:"Primary",
  label:"Secondary",
},
{
  values:"Combined pre-primary & primary ",
  label:"Combined pre-primary & primary",
},
{
  values:"Combined primary & secondary",
  label:"Combined pre-primary, primary & secondary.",
},
]

const schoolsHowLong=[
  {
  value:"On premises ",
  label:"On premises",
},
{
  value:" Up to 500 m ",
  label:" Up to 500 m ",
},
{
  value:"  500 m or further Note: On premises means within the building or facility grounds.",
  label:"  500 m or further Note: On premises means within the building or facility grounds. ",
},


]

const schoolsFrequencies=[
  {
  value:"Yes",
  label:"Yes",
},
{
  value:"No",
  label:"No",
},

]


const schoolsSources =[
  {
  values:"Piped water supply inside the school building ",
  label:"Piped water supply inside the school building ",
},
{
  values:"Piped water supply outside the school building  ",
  label:"Piped water supply outside the school building  ",
},
{
  values:"Protected well/spring",
  label:"Protected well/spring",
},
{
  values:"Rainwater",
  label:"Rainwater",
},
{
  values:"Unprotected well/spring ",
  label:"Unprotected well/spring ",
},
{
  values:"Packaged bottled water ",
  label:"Packaged bottled water ",
},
{
  values:"Tanker-truck or cart ",
  label:"Tanker-truck or cart ",
},
{
  values:"Surface water (lake, river, stream)  ",
  label:"Surface water (lake, river, stream) ",
},
{
  values:"No water source ",
  label:"No water source ",
},
]

const householdSources=[
  {
  values:"On premises from a piped water source",
  label:"On premises from a piped water source",
},
{
  values:"An improved source",
  label:"An improved source",
},
{
  values:"Surface water",
  label:"Surface water",
},
]

const householdFrequencies=[
  {
  values:"Water was not sufficient/not available when needed",
  label:"Water was not sufficient/not available when needed",
},
{
  values:"Water was sufficient/available when needed",
  label:"Water was sufficient/available when needed",
}
]

const householdHowLongs=[
  {
  values:"Less than 30 minutes round trip",
  label:"Less than 30 minutes round trip",
},
{
  values:"More than 30 minutes round trip",
  label:"More than 30 minutes round trip",
}
]
export default function DashboardApp() {
  const theme = useTheme();
const dispatch=useDispatch();
const provinces=useSelector((state)=>state.getProvinces)
const districts=useSelector((state)=>state.getDistricts)
const sectors=useSelector((state)=>state.getSectors)
const cells=useSelector((state)=>state.getCells)
const villages=useSelector((state)=>state.getVillages)
const addSchool=useSelector((state)=>state.addSchool);
const addHouseHold=useSelector((state)=>state.addHouseHold);
const addHealthFacility=useSelector((state)=>state.addHealthFacility)
const [openSuccess, setOpenSuccess] = React.useState(false);
const [open, setOpen] = React.useState(false);
  const [role,setRole]=useState('')
  const [onpentSchool,setOpentSchool]=useState(false)
  const [openHouseHold,setOpenHouseHold]=useState(false)
  const [openHealthFacility,setOpenHealthFacility]=useState(false)
  const [provincesData,setProvincesData]=useState('')
  const [provinceName,setProvinceName]=useState('');
  const [provinceId,setProvinceId]=useState('');
  const [districtData,setDistrictData]=useState([]);
 const [districtName ,setDistrictName]=useState('')
  //schoool
  const [schoolName,setSchoolName]=useState('')
  const [schoolSource,setSchoolSource]=useState('')
  const [schoolFrequency,setSchoolFrequency]=useState('')
  const [schoolHowLong,setSchoolHowLong]=useState('');
  const [schoolLevel,setSchoolLevel]=useState('')
  //houseHold
  const [householdPhone,setHouseholdPhone]=useState('')
  const [householdSource,setHouseholdSource]=useState('')
  const [householdFrequency,setHouseholdFrequency]=useState('')
  const [householdHowLong,setHouseholdHowLong]=useState('');
  const [totalNumberOfSchool,setTotalNumberOfSchool]=useState('')
  const [totalNumberOfHouseHold,setTotalNumberOfHouseHold]=useState('');
  const [totalNumberOfHealthfacility,setTotalNumberOfHealthfacility]=useState('')
  //health facility
const [healthfacilityType,setHealthfacilityType]=useState('')
const [healthfacilityHowLong,setHealthfacilityHowLong]=useState('')
const [healthfacilitySource,setHealthfacilitySource]=useState('')
const [healthfacilityName,setHealthfacilityName]=useState('')


  useEffect(() => {
    const auth=localStorage.getItem("wmsAuth")
    const userAuth=localStorage.getItem("userAuth")
    if(auth && userAuth){
      const  {role} =JSON.parse(userAuth)
      setRole(role)
    }
  }, []);
  const handleOnChange=async(e)=>{
    setProvinceId(e.target.value)
    provinces.details.map((p)=>{
      if(p.id==e.target.value){
        setProvinceName(p.Provinces)
      }
    })
    await dispatch(getDistrictsAction(e.target.value))
    districts.details.map((d)=>{
      if(d.id==e.target.value){
        setDistrictName(d.Districts)
      }
    })
  }
  const handleSaveHealthFacility=async ()=>{
    await dispatch(addHealthFacilityAction({provinceName,districtName,healthfacilityType,healthfacilityName,healthfacilitySource,healthfacilityHowLong} ))
    if(addHealthFacility.error){
      setOpen(true)
    }
    if(addHealthFacility.details){
      setOpenSuccess(true)
    }
  }
  const handleSaveHouseHold=async()=>{
    
    console.log("data..kkk..ll..",provinceName,districtName ,householdPhone,householdSource,householdFrequency,householdHowLong)
  await dispatch(addHouseHoldAction({provinceName,districtName ,householdPhone,householdSource,householdFrequency,householdHowLong}))
  if(addHouseHold.error){
    setOpen(true)
  }
  if(addHouseHold.details){
    setOpenSuccess(true)
  }

}
  
  const handleSaveSchool=async()=>{
    
    //console.log("data..kkk..ll..",provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel)
  await dispatch(addSchoolAction({provinceName,districtName ,schoolName,schoolSource,schoolFrequency,schoolHowLong,schoolLevel}))
  if(addSchool.error){
    setOpen(true)
  }
  if(addSchool.schools){
    setOpenSuccess(true)
  }

}
  const handleDistrict=async()=>{

  }
  useEffect(()=>{
    async function fetchSchoolData() {
      const url=`http://localhost:8000/api/schools/`
   
      await axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setTotalNumberOfSchool(response.data.data.length)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

      async function fetchHealthFacility() {
        const url=`http://localhost:8000/api/healthfacilities`
        await axios.get(url)
        .then(function (response) {
          console.log(response.data);
          setTotalNumberOfHealthfacility(response.data.data.length)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    async function fetchHouseHoldData() {
      const url=`http://localhost:8000/api/households/`
      await axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setTotalNumberOfHouseHold(response.data.data.length)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    fetchHouseHoldData() 
    fetchSchoolData();
    fetchHealthFacility()
  },[])
 
  useEffect(() => {
    async function fetchData() {
      await dispatch(getProvincesAction())
      if (!provinces.loading) {
        if (provinces.details) {
          setProvincesData(provinces.details)
        }       
    }
    if(!districts.loading){
      if(districts.details){
        setDistrictData(districts.details)
      }
    }
  }
    fetchData();
    getData();
    getDataHouseHold();
    getDataHealthFacilities()
  },[!provinces.details,!districts.details]);


  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [radarData, setRadarData] = useState([]);


  const getDataHealthFacilities = async () => {
   
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let SurfaceWaterSource = 0;
    const url='http://localhost:8000/api/healthfacilities'
    try {
      const responce = await axios.get(url);
      
      for (const key in responce.data.data) {
        let source = responce.data.data[key].source;
        let distance=responce.data.data[key].how_long
        let provName=responce.data.data[key].prov_name
        if (source=== "an improved source" ) {
          SafelyManagedServices = SafelyManagedServices + 1;
        } else if (source === "an improved source" && distance==="less than 30 minutes round trip" ) {
          BasicServices =  BasicServices + 1;
        } else if (source === "an improved source" && distance==="more than 30 minutes round trip" ) {
          LimitedServices = LimitedServices + 1;
        } else {
          SurfaceWaterSource = SurfaceWaterSource  + 1;
        }
      }
    
      const data = [
        { label: "Safely Managed Services", value: SafelyManagedServices},
        { label: "Surface Water", value: SurfaceWaterSource },
        { label: "Limited Services", value: LimitedServices },
        { label: "Basic Services ", value: BasicServices},
      ];
    
      console.log("daooo",data)
       setRadarData(data);
    // setPieData(data);
    } catch (error) {
      console.log(error);
    }
  };


  const getDataHouseHold = async () => {
   
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let SurfaceWaterSource = 0;
    const url='http://localhost:8000/api/households'
    try {
      const responce = await axios.get(url);
      
      for (const key in responce.data.data) {
        let source = responce.data.data[key].source;
        let distance=responce.data.data[key].how_long
        let provName=responce.data.data[key].prov_name
        if (source=== "On premises from a piped water source" ) {
          SafelyManagedServices = SafelyManagedServices + 1;
        } else if (source === "Surface water"  ) {
          SurfaceWaterSource =  SurfaceWaterSource + 1;
        } else if (source === "An improved source" && distance==="More than 30 minutes round trip" ) {
          LimitedServices = LimitedServices + 1;
        } else {
          BasicServices = BasicServices  + 1;
        }
      }
    
      const data = [
        { label: "Safely Managed Services", value: SafelyManagedServices},
        { label: "Surface Water", value: SurfaceWaterSource },
        { label: "Limited Services", value: LimitedServices },
        { label: "Basic Services ", value: 2},
      ];
    
     
      // const lineData = [
      //   { name: "unfinished", "Active User": unfinished },
      //   { name: "approved", "Active User": approved },
      //   { name: "rejected", "Active User": rejected },
      // ];
      console.log("daooo",data)
       setLineData(data);
    // setPieData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
   
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let UnimprovedWaterSource = 0;
    const url='http://localhost:8000/api/schools/'
    try {
      const responce = await axios.get(url);
      
      for (const key in responce.data.data) {
        let source = responce.data.data[key].source;
        let distance=responce.data.data[key].how_long
        if (source=== "Packaged bottled water" || distance==="On premises ") {
          SafelyManagedServices = SafelyManagedServices + 1;
        } else if (source === "Rainwater" || distance==="Up to 500 m") {
          BasicServices = BasicServices + 1;
        } else if (source === "Protected well/spring" || distance==="500 m or further Note: On premises means within the building or facility grounds.") {
          LimitedServices = LimitedServices + 1;
        } else {
          UnimprovedWaterSource =  UnimprovedWaterSource  + 1;
        }
      }
    
      const data = [
        { label: "Safely Managed Services", value: SafelyManagedServices},
        { label: "Basic Services", value: BasicServices },
        { label: "Limited Services", value: LimitedServices },
        { label: "Unimproved Water Source", value: UnimprovedWaterSource},
      ];
      // const lineData = [
      //   { name: "unfinished", "Active User": unfinished },
      //   { name: "approved", "Active User": approved },
      //   { name: "rejected", "Active User": rejected },
      // ];
      // setLineDisplay(lineData);
     setPieData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpenSchool = () => {
    setOpentSchool(true);
  };
  const handleClickOpenHouseHold = () => {
    setOpenHouseHold(true);
  };
  const handleOpenHealthFacility=()=>{
    setOpenHealthFacility(true)
  }

  const handleClose = () => {
    setOpentSchool(false);
    setOpenHouseHold(false);
    setOpenHealthFacility(false)
  
  };


  return (
    <React.Fragment>
    <Dialog open={openHealthFacility} onClose={handleClose}>
    <DialogTitle>HealthFacility information</DialogTitle>
    <DialogContent>
      <DialogContentText>
        please provide HealthFacility unformation. We
        will send updates occasionally.
      </DialogContentText>
      {
        !addHealthFacility.error? null:
         <Collapse in={open}>
         <Alert
         severity="error"
           action={
             <IconButton
               aria-label="close"
               color="inherit"
               size="small"
               onClick={handleClose}
             
             >
               <CloseIcon fontSize="inherit" />
             </IconButton>
           }
           sx={{ mb: 0.2 }}
         >
          {addHealthFacility.error}
         </Alert>
       </Collapse>
      }    
      {
        addHealthFacility.details? <Collapse in={openSuccess}>
        <Alert
        severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 0.2 }}
        >
         {addHealthFacility.details}
        </Alert>
      </Collapse>:null
      }
     
      <TextField
        autoFocus
        margin="dense"
        id="healthfacilityName"
        name="healthfacilityName"
       onChange={(e)=>setHealthfacilityName(e.target.value)}
        value={healthfacilityName}
        label=" Name"
        required
        type="text"
        fullWidth
        variant="standard"
      />
    
      <TextField
      id="outlined-select-currency-native"
      select
      label="Select "
     // value={role}
     // name="role"
      fullWidth
      required
      variant="standard"
      onChange={(e)=>handleOnChange(e)
        }
     onKeyPress={handleDistrict}
      SelectProps={{
        native: true,
      }} 
    >
      {provinces.details.map((option) => (
        <option key={option.id} value={option.id}  >
        
          {option.Provinces}
        </option>
      ))}
    </TextField>
    {
      !districts.details.length?null:
      <TextField
      id="outlined-select-currency-native"
      select
      label="Select "
     // value={role}
     // name="role"
      fullWidth
      required
      variant="standard"
      onChange={(e)=>handleOnChange(e)
        }
     onKeyPress={handleDistrict}
      SelectProps={{
        native: true,
      }} 
    >
      {districts.details.map((option) => (
        <option key={option.id} value={option.id}  >
        
          {option.Districts}
        </option>
      ))}
    </TextField>

     }
   

      <Typography variant="h6" gutterBottom>
      1.	What is the type of the health facility? (select one that applies)
       </Typography>
        <TextField
      id="outlined-select-currency-native"
      select
      label="Select "
     value={healthfacilityType}
      name="healtfacilityType"
      fullWidth
      required
      variant="standard"
     onChange={(e)=>setHealthfacilityType(e.target.value)}
      SelectProps={{
        native: true,
      }}
     
    >
      {healthFacilityTypes.map((option) => (
        <option key={option.values} value={option.values}>
          {option.label}
        </option>
      ))}
    </TextField>

    <Typography variant="h6" gutterBottom>
    2.	What is the main source of water provided by the HF?
   </Typography>
    <TextField
  id="outlined-select-currency-native"
  select
  label="Select "
 value={healthfacilitySource}
  name="healthfacilitySource"
  fullWidth
  required
  variant="standard"
  onChange={(e)=>setHealthfacilitySource(e.target.value)}
  SelectProps={{
    native: true,
  }}
 
>
  {healthFacilitySources.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</TextField>
<Typography variant="h6" gutterBottom>
3.  Approximatively, how long did it take for members to get there and come back from where they collected water?
</Typography>
<TextField
id="outlined-select-currency-native"
select
label="Select "
value={healthfacilityHowLong}
name="healthfacilityHowLong"
fullWidth
required
variant="standard"
onChange={(e)=>setHealthfacilityHowLong(e.target.value)}
SelectProps={{
native: true,
}}

>
{healthFacilityHowLongs.map((option) => (
<option key={option.value} value={option.value}>
  {option.label}
</option>
))}
</TextField>

    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSaveHealthFacility} >
  {addHealthFacility.loading?"loading":"Save"}
      </Button>
    </DialogActions>
  </Dialog>
    <Dialog open={onpentSchool} onClose={handleClose}>
        <DialogTitle>School information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please provide School unformation. We
            will send updates occasionally.
          </DialogContentText>
          {
            !addSchool.error? null:
             <Collapse in={open}>
             <Alert
             severity="error"
               action={
                 <IconButton
                   aria-label="close"
                   color="inherit"
                   size="small"
                   onClick={handleClose}
                 
                 >
                   <CloseIcon fontSize="inherit" />
                 </IconButton>
               }
               sx={{ mb: 0.2 }}
             >
              {addSchool.error}
             </Alert>
           </Collapse>
          }    
          {
            addSchool.schools? <Collapse in={openSuccess}>
            <Alert
            severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 0.2 }}
            >
             {addSchool.schools}
            </Alert>
          </Collapse>:null
          }
         
          <TextField
            autoFocus
            margin="dense"
            id="schoolName"
            name="schoolName"
           onChange={(e)=>setSchoolName(e.target.value)}
            value={schoolName}
            label="School Name"
            required
            type="text"
            fullWidth
            variant="standard"
          />
        
          <TextField
          id="outlined-select-currency-native"
          select
          label="Select "
         // value={role}
         // name="role"
          fullWidth
          required
          variant="standard"
          onChange={(e)=>handleOnChange(e)
            }
         onKeyPress={handleDistrict}
          SelectProps={{
            native: true,
          }} 
        >
          {provinces.details.map((option) => (
            <option key={option.id} value={option.id}  >
            
              {option.Provinces}
            </option>
          ))}
        </TextField>
        {
          !districts.details.length?null:
          <TextField
          id="outlined-select-currency-native"
          select
          label="Select "
         // value={role}
         // name="role"
          fullWidth
          required
          variant="standard"
          onChange={(e)=>handleOnChange(e)
            }
         onKeyPress={handleDistrict}
          SelectProps={{
            native: true,
          }} 
        >
          {districts.details.map((option) => (
            <option key={option.id} value={option.id}  >
            
              {option.Districts}
            </option>
          ))}
        </TextField>
  
         }
       

          <Typography variant="h6" gutterBottom>
            1.	What is the type of the school? (select on that applies): 
           </Typography>
            <TextField
          id="outlined-select-currency-native"
          select
          label="Select "
         value={schoolSource}
          name="schoolSource"
          fullWidth
          required
          variant="standard"
         onChange={(e)=>setSchoolSource(e.target.value)}
          SelectProps={{
            native: true,
          }}
         
        >
          {schoolsSources.map((option) => (
            <option key={option.values} value={option.values}>
              {option.label}
            </option>
          ))}
        </TextField>

        <Typography variant="h6" gutterBottom>
        2.	What is the main source of drinking water provided by the school? (Select one - most frequently used):
       </Typography>
        <TextField
      id="outlined-select-currency-native"
      select
      label="Select "
     value={schoolFrequency}
      name="schoolFrequency"
      fullWidth
      required
      variant="standard"
      onChange={(e)=>setSchoolFrequency(e.target.value)}
      SelectProps={{
        native: true,
      }}
     
    >
      {schoolsFrequencies.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
    <Typography variant="h6" gutterBottom>
    3.	Where is the main water supply for the facility located? 
   </Typography>
    <TextField
  id="outlined-select-currency-native"
  select
  label="Select "
 value={schoolHowLong}
  name="schoolHowLong"
  fullWidth
  required
  variant="standard"
 onChange={(e)=>setSchoolHowLong(e.target.value)}
  SelectProps={{
    native: true,
  }}
 
>
  {schoolsHowLong.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</TextField>
<Typography variant="h6" gutterBottom>
4.	Is drinking water from the main source currently available at the school?
   </Typography>
    <TextField
  id="outlined-select-currency-native"
  select
  label="Select "
 value={schoolLevel}
  name="schoolLevel"
  fullWidth
  required
  variant="standard"
 onChange={(e)=>setSchoolLevel(e.target.value)}
  SelectProps={{
    native: true,
  }}
 
>
  {schoolsLevels.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveSchool} >
      {addSchool.loading?"loading":"Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openHouseHold} onClose={handleClose}>
      <DialogTitle>HouseHold information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          please provide Household unformation. We
          will send updates occasionally.
        </DialogContentText>
        {
          !addHouseHold.error? null:
           <Collapse in={open}>
           <Alert
           severity="error"
             action={
               <IconButton
                 aria-label="close"
                 color="inherit"
                 size="small"
                 onClick={handleClose}
               
               >
                 <CloseIcon fontSize="inherit" />
               </IconButton>
             }
             sx={{ mb: 0.2 }}
           >
            {addHouseHold.error}
           </Alert>
         </Collapse>
        }    
        {
          addHouseHold.details? <Collapse in={openSuccess}>
          <Alert
          severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 0.2 }}
          >
           {addHouseHold.details}
          </Alert>
        </Collapse>:null
        }
       
        <TextField
          autoFocus
          margin="dense"
          id="householdPhone"
          name="householdPhone"
         onChange={(e)=>setHouseholdPhone(e.target.value)}
          value={householdPhone}
          label="Phone Number"
          required
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
        id="outlined-select-currency-native"
        select
        label="Select "
       // value={role}
       // name="role"
        fullWidth
        required
        variant="standard"
        onChange={(e)=>handleOnChange(e)
          }
       onKeyPress={handleDistrict}
        SelectProps={{
          native: true,
        }} 
      >
        {provinces.details.map((option) => (
          <option key={option.id} value={option.id}  >
          
            {option.Provinces}
          </option>
        ))}
      </TextField>
      {
        !districts.details.length?null:
        <TextField
        id="outlined-select-currency-native"
        select
        label="Select "
       // value={role}
       // name="role"
        fullWidth
        required
        variant="standard"
        onChange={(e)=>handleOnChange(e)
          }
       onKeyPress={handleDistrict}
        SelectProps={{
          native: true,
        }} 
      >
        {districts.details.map((option) => (
          <option key={option.id} value={option.id}  >
          
            {option.Districts}
          </option>
        ))}
      </TextField>

       }
     

        <Typography variant="h6" gutterBottom>
          	1.	Where did the household collect water in the past 6 months?
         </Typography>
          <TextField
        id="outlined-select-currency-native"
        select
        label="Select "
       value={householdSource}
        name="householdSource"
        fullWidth
        required
        variant="standard"
       onChange={(e)=>setHouseholdSource(e.target.value)}
        SelectProps={{
          native: true,
        }}
       
      >
        {householdSources.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      <Typography variant="h6" gutterBottom>
      2.	If water was collected from the source located premises, how frequent it was available?
     </Typography>
      <TextField
    id="outlined-select-currency-native"
    select
    label="Select..."
   value={householdFrequency}
    name="householdFrequency"
    fullWidth
    required
    variant="standard"
    onChange={(e)=>setHouseholdFrequency(e.target.value)}
    SelectProps={{
      native: true,
    }}
   
  >
    {householdFrequencies.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
  <Typography variant="h6" gutterBottom>

  3.	Approximatively, how long did it take for household members to get there and come back from where they collected water?

 </Typography>
  <TextField
id="outlined-select-currency-native"
select
label="Select "
 value={householdHowLong}
name="householdHowLong"
fullWidth
required
variant="standard"
onChange={(e)=>setHouseholdHowLong(e.target.value)}
SelectProps={{
  native: true,
}}

>
{householdHowLongs.map((option) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
))}
</TextField>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveHouseHold} >
        {addHouseHold.loading?"loading":"Save"}
        </Button>
      </DialogActions>
    </Dialog>

    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Water Monitoring System Dashboard
        </Typography>
        {
          role==="User"? 
          <Grid item xs={12} md={6} lg={4}>
          <Card >
        <CardHeader title="Informations" subheader="Selecct service" />
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <Paper key="" variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            <Button
            sx={{ py: 2.5, textAlign: 'center' }}
            onClick={handleClickOpenSchool}
            >
                {/* <Box sx={{ mb: 0.5 }}>icon</Box> */}
                <Typography variant="h6">Schools</Typography>
  
                </Button>
              </Paper>
              <Paper key="" variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            <Button
            sx={{ py: 2.5, textAlign: 'center' }}
            >
                {/* <Box sx={{ mb: 0.5 }}>icon</Box> */}
                <Typography variant="h6">Public Place</Typography>
  
                </Button>
              </Paper>
              <Paper key="" variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            <Button
            sx={{ py: 2.5, textAlign: 'center' }}
            onClick={handleOpenHealthFacility}
            >
                {/* <Box sx={{ mb: 0.5 }}>icon</Box> */}
                <Typography variant="h6">Health Facilities</Typography>
  
                </Button>
              </Paper>
              <Paper key="" variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            <Button
            sx={{ py: 2.5, textAlign: 'center' }}
            onClick={handleClickOpenHouseHold}
            >
                {/* <Box sx={{ mb: 0.5 }}>icon</Box> */}
                <Typography variant="h6">households</Typography>
  
                </Button>
              </Paper>
          </Box>
        </CardContent>
      </Card>
      </Grid>:null
        }
        

        <Grid container spacing={3}>
        {
          role==="SuperAdmin" || role=="Admin" ?
          <React.Fragment>
          <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="HouseHolds" total={totalNumberOfHouseHold}  />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Schools" total={totalNumberOfSchool} color="info" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Pabluci Place" total={17} color="warning" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Health Facilities" total={totalNumberOfHealthfacility} color="error"  />
        </Grid>

          </React.Fragment>
         
          :null
        }
       
        {
          role==="SuperAdmin"?
          <React.Fragment>
          <Grid item xs={12} md={6} lg={8}>
          <AppConversionRates
            title="House Holds"
            subheader=""
            chartData={lineData}
          />
        </Grid>
         

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Schools"
            chartData={pieData}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Public Places"
            subheader=""
            
              chartLabels={[8,8,9]}
           
           
            chartData={[
              {
                name: 'Kigali ',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Westen',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Easten',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
              {
                name: 'North',
                type: 'line',
                fill: 'solid',
                data: [10, 230, 36, 25, 35, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title="Health Facilities"
          chartData={radarData}
          chartColors={[
            theme.palette.primary.main,
            theme.palette.chart.blue[0],
            theme.palette.chart.violet[0],
            theme.palette.chart.yellow[0],
          ]}
        />
      </Grid>
          </React.Fragment>:null
        }  
        </Grid>
      </Container>
    </Page>
    </React.Fragment>
    
  );
}
