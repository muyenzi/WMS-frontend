import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
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
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  CardHeader, CardContent,
} from '@mui/material';


import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { useDispatch,useSelector } from 'react-redux';
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
// mock
import USERLIST from '../_mock/user';

import { getUsersAction } from "../redux/actions/getUsersAction"
import { getSchoolsAction } from '../redux/actions/schoolsAction';
import { getHouseholdsAction } from '../redux/actions/houseHoldAction';


import moment from "moment";
import jsPdf from "jspdf";
import autoTable from 'jspdf-autotable';
import logo from "../components/images/logo.png";

// ----------------------------------------------------------------------
const roles=[{
  value:"SuperAdmin",
  label:"Super Admin"
},
{
  value:"Admin",
  label:"Admin"
},
{
  value:"User",
  label:"User"
},
{
  value:"OrganistionLeader",
  label:"Organistion Leader"
},
]

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'source', label: 'Source', alignRight: false },
  { id: 'howLong', label: 'Distance', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'Action', label: 'Action', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function School() {
  const [page, setPage] = useState(0);
  const theme = useTheme();

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('User');
  const [usersDetails,setUsersDetails]=useState('')
  const [ houseHoldsDetails, setHouseHoldsDetails]=useState([])
 const dispatch=useDispatch();
 const getAllUsers=useSelector((state)=>state.getUsers);
 const getSchools=useSelector((state)=>state.getSchools);
 const getHouseHolds=useSelector((state)=>state.getHouseHolds)
 const [openFeedBack,setOpenFeedBack]=useState(false)
 const [limit, setLimit] = useState(5);
 const [selectedExamIds, setSelectedExamIds] = useState([]);
 const [results, setResults] = useState({});
 const [search, setSearch] = useState(false);


/////filtering
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
  console.log("province ::",provincesData )
}).catch((error)=>{
  console.log(error)
})}
  
  fetchProvinces()
},[])

console.log("province name::",provincesData ,provinceName,districtName,sectorName,cellName,villageName)
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
 //////////////////////////////////////////////////////////

 const handleFeedBack=(id)=>{
    setOpenFeedBack(true)
   }
   const todaydate=new Date().toISOString().slice(0,10);
   const generateListOfApprovedHoseHold =()=> {
    const doc = new jsPdf();
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Water Management System", 20, 50);
    doc.text(`MININFRA`, 20, 55);
    doc.text("Email: info@mininfra.gov.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("Liste of approved households", 70, 75);
     const tableColumn=['Phone','Province','District','Source','status']
    const tableRows=[]
  
    houseHoldsDetails.map(h =>{
      const householdData=[
        h.phoneNumber,
        h.prov_name,
        h.dis_name,
        h.source,
        h.status,
       
       // format(new Date(student.updated_at), "yyyy-MM-dd")
  
      ];
       if(h.status==="Approved"){
      tableRows.push(householdData);
       }
      
    });
   
    doc.autoTable(tableColumn, tableRows, { 
      startY: 80,
    theme: "striped",
    margin: 10,
    styles: {
      font: "courier",
      fontSize: 12,
      overflow: "linebreak",
      cellPadding: 3,
      halign: "center",
    },
    head: [tableColumn],
    body: [tableRows],
     });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`report_${dateStr}.pdf`);
  };
  
  
const handleAproveHouseHold=(id)=>{
const url=`http://localhost:8000/api/households/approve-household/${id}`
axios.put(url, {})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
}
const handleRejectHouseHold=(id)=>{
  const url=`http://localhost:8000/api/households/reject-household/${id}`
  axios.put(url, {})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
 useEffect(() => {
  async function fetchData() {
   // await dispatch(getUsersAction())
    await dispatch(getHouseholdsAction())
    if (!getHouseHolds.loading) {
      if (getHouseHolds.details) {
        setHouseHoldsDetails(getHouseHolds.details)
      }
    }
  }
  fetchData();
  if(districtName){
    fetchDistrictData()
  }
  if(sectorName){
    fetchSectorData()
  }
  if(cellName){
    fetchCellData()
  }
}, [getHouseHolds.details]);
 
const [pieData, setPieData] = useState([]);

  async function fetchDistrictData(){
    const labelSet = [];
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let SurfaceWaterSource = 0;
    await axios
      .post(
        `http://localhost:8000/api/households/householdbydistrictname`,
        {
          districtName:districtName.replaceAll(/\s/g, ''),
        }
      )
      .then(function(response) {
        
        const res = response.data.data;
        return res;
      })
      .then(function(res) {
        console.log("ggg ",res)
        for (const key in res) {
          let source = res[key].source;
          let distance=res[key].how_long
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
        setPieData(data);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  
  }

  const handleClose = () => {
    setOpen(false);
    setOpenFeedBack(false)
  };


  const [sectorpieData, setSectorpieData] = useState([]);

  async function fetchSectorData(){
    const labelSet = [];
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let SurfaceWaterSource = 0;
    await axios
      .post(
        `http://localhost:8000/api/households/householdbysectorname`,
        {
          sectorName:sectorName.replaceAll(/\s/g, ''),
        }
      )
      .then(function(response) {
        
        const res = response.data.data;
        return res;
      })
      .then(function(res) {
        console.log("ggg ",res)
        for (const key in res) {
          let source = res[key].source;
          let distance=res[key].how_long
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
        setSectorpieData(data);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  
  }
  const [cellpieData, setCellpieData] = useState([]);

  async function fetchCellData(){
    const labelSet = [];
    let SafelyManagedServices = 0;
    let BasicServices = 0;
    let LimitedServices = 0;
    let SurfaceWaterSource = 0;
    await axios
      .post(
        `http://localhost:8000/api/households/householdbycellname`,
        {
          cellName:cellName.replaceAll(/\s/g, ''),
        }
      )
      .then(function(response) {
        
        const res = response.data.data;
        return res;
      })
      .then(function(res) {
        console.log("ggg ",res)
        for (const key in res) {
          let source = res[key].source;
          let distance=res[key].how_long
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
        setCellpieData(data);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  
  }



  

  const trimString = (s) => {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == " ") l++;
    while (r > l && s[r] == " ") r -= 1;
    return s.substring(l, r + 1);
  };
  const compareObjects = (o1, o2) => {
    var k = "";
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  };
  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)
    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < houseHoldsDetails.length; i++) {
        for (var key in houseHoldsDetails[i]) {
          if (houseHoldsDetails[i][key] != null) {
            if (
                houseHoldsDetails[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, houseHoldsDetails[i]))
                results.push(houseHoldsDetails[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
 


  return (
    <React.Fragment>
    
    <DialogTitle>Please select ...</DialogTitle>
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
    </div>
  </Box>
  <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch',height:'25ch' },
    }}
    noValidate
    autoComplete="off"
  >
  <Grid item xs={12} md={6} lg={4}>
          <Card >
          <CardHeader title="Households Information Analytics" subheader="Distric/sector/cell" />
          <CardContent>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
{
  districtName?
  <Grid item xs={12} md={6} lg={4}>
  <AppCurrentVisits
    title="District Analytics"
    chartData={pieData}
    chartColors={[
      theme.palette.primary.main,
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.yellow[0],
    ]}
  />
</Grid>
  :null
}
 

           {
            sectorName?
            <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Sector Analytics"
              chartData={sectorpieData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
            :null
           }
         {
          cellName?
          <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Cell Analytics"
            chartData={cellpieData}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>
          :null
         }
        

            </Box>
            </CardContent>

          </Card>
          </Grid>
 
  </Box>
    <Dialog onClose={handleClose} open={openFeedBack}>
    <DialogTitle>Provide feedbak</DialogTitle>
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
        id="outlined-multiline-static"
        label="Type Message"
        multiline
        rows={4}
        defaultValue="Message..."
      />
    </div>
  </Box>
    <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={handleClose} >Close</Button>
              
                 
                </ButtonGroup>
  </Dialog>
     <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          List of Approved   HouseHold
          </Typography>
          {/* <Button variant="contained" component={RouterLink} onClick={handleClickOpen} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <TableContainer component={Paper}>
        <Box sx={{ maxWidth: 400, position:"center", display:"flex"}}>
        <TextField
          fullWidth
          onChange={(e) => searchHandle(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action">
                  <SearchIcon />
                </SearchIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search ..."
          variant="outlined"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
          >
          
          <ButtonGroup variant="text" aria-label="text button group">
            
            <Button onClick={generateListOfApprovedHoseHold }>Generate report</Button>
          </ButtonGroup>
          </Box>

  </Box>
        <Table aria-label="caption table">
          <caption className="textTitle">Household List</caption>
          {/* <Button
              variant="contained"
              sx={{ backgroundColor: "#F9842C" }}
              className="buttonGroup"
              onClick={generatePdfs}
              >
              Print
              </Button> */}
             
          
          <TableHead>
            <TableRow>
              <TableCell align="center">Phone</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="center">Distance</TableCell>
              <TableCell align="center">Frequency</TableCell>
              <TableCell align="center">Status</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
        
          {
            search?(
              <React.Fragment>
              {results.slice(0, limit).map((details) => (
                <TableRow
                hover
                key={details.id}
                selected={selectedExamIds.indexOf(details.id) !== -1}
              >
              {
                details.status=="Approved"?
                <React.Fragment>
                <TableCell align="center">{details.phoneNumber}</TableCell>
                <TableCell component="th" scope="row">
                  {details.source}
                </TableCell>
               
                <TableCell align="center">{details.how_long}</TableCell>
                <TableCell align="center">{details.frequency}</TableCell>
                <TableCell align="center">{details.status}</TableCell>
                <TableCell align="center">

               
      
              
                </TableCell>
                </React.Fragment>:null
              }
                
              </TableRow>
              ))}
              </React.Fragment>
            ):(
              <React.Fragment>
              {houseHoldsDetails.slice(0, limit).map((details) => (
              <TableRow
                hover
                key={details.id}
                selected={selectedExamIds.indexOf(details.id) !== -1}
              >
              {details.status=="Approved"?
            <React.Fragment>
            <TableCell align="center">{details.phoneNumber}</TableCell>
            <TableCell component="th" scope="row">
              {details.source}
            </TableCell>
           
            <TableCell align="center">{details.how_long}</TableCell>
            <TableCell align="center">{details.frequency}</TableCell>
            <TableCell align="center">{details.status}</TableCell>
            <TableCell align="center">

          
            </TableCell>
            </React.Fragment>:null
          }
               
              </TableRow>
              ))}
              </React.Fragment>
            )}
                
            
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </Page>
    

    </React.Fragment>
   
  );
}
