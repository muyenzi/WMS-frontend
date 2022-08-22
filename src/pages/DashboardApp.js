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
import { addSchoolAction } from '../redux/actions/addSchoolAction';
import Collapse from "@mui/material/Collapse";
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton} from '@mui/material';
const schoolsSources=[
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

const schoolsLevels=[
  {
  value:"Yes",
  label:"Yes",
},
{
  value:"No",
  label:"No",
},

]


const schoolsFrequencies=[
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

const householdHowLong=[
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
const provinces=useSelector(state=>state.getProvinces)
const districts=useSelector(state=>state.getDistricts)
const addSchool=useSelector(state=>state.addSchool);

const [openSuccess, setOpenSuccess] = React.useState(false);
const [open, setOpen] = React.useState(false);
  const [role,setRole]=useState('')
  const [onpentSchool,setOpentSchool]=useState(false)
  const [onpenHouseHold,setOpenHouseHold]=useState(false)
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

  console.log("district data:::",districtData)
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
  },[!provinces.details,!districts.details]);
  const handleClickOpenSchool = () => {
    setOpentSchool(true);
  };
  const handleClickOpenHouseHold = () => {
    setOpenHouseHold(true);
  };

  const handleClose = () => {
    setOpentSchool(false);
    setOpenHouseHold(false);
  
  };


  return (
    <React.Fragment>
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
            <option key={option.value} value={option.value}>
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
      <Dialog open={onpenHouseHold} onClose={handleClose}>
      <DialogTitle>HouseHold information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          please provide Household unformation. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="household"
          name="phone"
         // onChange={(e)=>setFullname(e.target.value)}
          //value={fullname}
          label="Phone Number"
          required
          type="text"
          fullWidth
          variant="standard"
        />
        <Typography variant="h6" gutterBottom>
          	1.	Where did the household collect water in the past 6 months?
         </Typography>
          <TextField
        id="outlined-select-currency-native"
        select
        label="Select "
       // value={role}
        name="role"
        fullWidth
        required
        variant="standard"
      //  onChange={(e)=>setRole(e.target.value)}
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
    label="Select "
   // value={role}
    name="role"
    fullWidth
    required
    variant="standard"
  //  onChange={(e)=>setRole(e.target.value)}
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
// value={role}
name="role"
fullWidth
required
variant="standard"
//  onChange={(e)=>setRole(e.target.value)}
SelectProps={{
  native: true,
}}

>
{householdHowLong.map((option) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
))}
</TextField>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button >
       Save
        </Button>
      </DialogActions>
    </Dialog>

    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Water Managment System Dashboard
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
          <AppWidgetSummary title="Organizations" total={714000} icon={'ant-design:android-filled'} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Health Facilities" total={1352831} color="info" icon={'ant-design:apple-filled'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Pabluci Place" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Schools" total={234} color="error" icon={'ant-design:bug-filled'} />
        </Grid>

          </React.Fragment>
         
          :null
        }
         
        {
          role==="SuperAdmin"?
          <React.Fragment>
          <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Organizations"
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ]}
            chartData={[
              {
                name: 'Team A',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Team B',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Team C',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Schools"
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Public Place"
            subheader="(+43%) than last year"
            chartData={[
              { label: 'Italy', value: 400 },
              { label: 'Japan', value: 430 },
              { label: 'China', value: 448 },
              { label: 'Canada', value: 470 },
              { label: 'France', value: 540 },
              { label: 'Germany', value: 580 },
              { label: 'South Korea', value: 690 },
              { label: 'Netherlands', value: 1100 },
              { label: 'United States', value: 1200 },
              { label: 'United Kingdom', value: 1380 },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Health Facilities"
            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
            chartData={[
              { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
              { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
              { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
            ]}
            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
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
