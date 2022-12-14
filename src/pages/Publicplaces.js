import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
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
import { getPublicPlacesAction } from '../redux/actions/publicPlaceAction';

// ----------------------------------------------------------------------
const roles=[{
  value:"Admin",
  label:"Admin"
},
{
  value:"DataAnalyst",
  label:"Data Analyst"
},
{
  value:"DataCollector",
  label:"Data Collector"
},
{
  value:"OrganistionAnalyst",
  label:"Organistion Analyst"
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
  const [value, setValue] = React.useState('Controlled');

  const handleChangeA = (event) => {
    setValue(event.target.value);
  };
 
  const [role, setRole] = React.useState('User');
 
 const dispatch=useDispatch();
 const getAllUsers=useSelector((state)=>state.getUsers);
 const getSchools=useSelector((state)=>state.getSchools);
 const getPublicPlaces=useSelector((state)=>state.getPublicPlaces)
 const [limit, setLimit] = useState(5);
 const [selectedExamIds, setSelectedExamIds] = useState([]);
 const [results, setResults] = useState({});
 const [search, setSearch] = useState(false);
 const [openFeedBack,setOpenFeedBack]=useState(false)
const [schoolId,setSchoolId]=useState('')

const [schoolsDetails,setSchoolsDetails]=useState([])
const [ publicPlacesDetails, setPuplicPlacesDetails]=useState([])
const [errorMessage,setErrorMessage]=useState('')
const [textMessage,setTextMessage]=useState('');
 const handleFeedBack=(id)=>{
  setSchoolId(id)
  setOpenFeedBack(true)
 }

 useEffect(() => {
    async function fetchData() {
     // await dispatch(getUsersAction())
     // await dispatch(getHouseholdsAction())
      await dispatch(getPublicPlacesAction())
      if (!getPublicPlaces.loading) {
        if (getPublicPlaces.details) {
          setPuplicPlacesDetails(getPublicPlaces.details)
        }
      }
    }
    fetchData();
  }, [getPublicPlaces.details]);


const handleAproveSchool=async(id)=>{
const url=`http://localhost:8000/api/schools/approve-school/${id}`
await axios.put(url, {})
.then(async function (response) {
  console.log(response.data);
  await dispatch(getALLSchools())
})
.catch(function (error) {
  console.log(error);
});
}
const handleRejectSchool=async(id)=>{
  const url=`http://localhost:8000/api/schools/reject-school/${id}`
 await axios.put(url, {})
  .then(async function (response) {
    console.log(response.data);
    await dispatch(getALLSchools())
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  
  const handleSentMessage=async(id)=>{
    const url=`http://localhost:8000/api/messages`
    await axios.post(url, {
      message:textMessage,
      ref_id:schoolId
    })
     .then(function (response) {
       console.log(response.data);
        setErrorMessage(response.data.message)
      
     
     })
     .catch(function (error) {
      setErrorMessage(error.response.data.message)
       console.log(error.response.data.message);
     });
  }
  const getALLSchools=async()=>{
    const url=`http://localhost:8000/api/schools/`
    await axios.get(url)
     .then(function (response) {
       console.log("hello schools",response.data.data);
       setSchoolsDetails(response.data.data)
       
     
     })
     .catch(function (error) {
    
       console.log(error.response.data.message);
     });
  }

 useEffect(() => {
  getALLSchools();
  async function fetchData() {
   // await dispatch(getUsersAction())
    // await dispatch(getSchoolsAction())
    // if (!getSchools.loading) {
    //   if (getSchools.details) {
    //     setSchoolsDetails(getSchools.details)
    //   }
    // }
  }
  fetchData();
}, []);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    // setOpen(false);
    setOpenFeedBack(false)
    setErrorMessage('')
    setTextMessage('')
  };

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
      for (var i = 0; i < schoolsDetails.length; i++) {
        for (var key in schoolsDetails[i]) {
          if (schoolsDetails[i][key] != null) {
            if (
              schoolsDetails[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, schoolsDetails[i]))
                results.push(schoolsDetails[i]);
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
    <Dialog onClose={handleClose} open={openFeedBack}>
    <DialogTitle>Provide feedbak</DialogTitle>
    {
      errorMessage? 
      <Typography> 
      {errorMessage}
    </Typography>
    :null
    }
    
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
        name="textMessage"
        value={textMessage}
        multiline
        onChange={(e)=>setTextMessage(e.target.value)}
        rows={4}
        defaultValue="Message..."
      />
    </div>
  </Box>
    <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={handleClose} >Cancel</Button>
                  <Button onClick={handleSentMessage}>Send</Button>
                 
                </ButtonGroup>
  </Dialog>
     <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Public Places
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

  </Box>
        <Table aria-label="caption table">
          <caption className="textTitle">Public Places List</caption>
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
              <TableCell align="center">Public Name</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="center">Distance</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">ACTION</TableCell>
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
              details.status=="Pending"?
              <React.Fragment>
              <TableCell align="center">{details.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {details.source}
                  </TableCell>
                 
                  <TableCell align="center">{details.how_long}</TableCell>
                  <TableCell align="center">{details.type}</TableCell>
                  <TableCell align="center">{details.status}</TableCell>
                  <TableCell align="center">
  
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
                    <Button onClick={async()=>{
                      handleAproveSchool(details.id)
                     }}>Approve</Button>
                    <Button onClick={()=>{
                      handleRejectSchool(details.id)
                    }}>Reject</Button>
                    <Button onClick={()=>{
                      handleFeedBack(details.id)
                    }}>FeedBack</Button>
                  </ButtonGroup>
                  </Box>
        
                
                  </TableCell>
              </React.Fragment>
              :null
             }
           
                
              </TableRow>
              ))}
              </React.Fragment>
            ):(
              
              <React.Fragment>
              {schoolsDetails.slice(0, limit).map((details) => (
              <TableRow
                hover
                key={details.id}
                selected={selectedExamIds.indexOf(details.id) !== -1}
              >
              
            {

              details.status=="Pending"?
              <React.Fragment>
                <TableCell align="center">{details.name}</TableCell>
                  <TableCell component="th" scope="row">
                    {details.source}
                  </TableCell>
                 
                  <TableCell align="center">{details.how_long}</TableCell>
                  <TableCell align="center">{details.type}</TableCell>
                  <TableCell align="center">{details.status}</TableCell>
                  <TableCell align="center">
  
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
                    <Button onClick={async()=>{
                      handleAproveSchool(details.id)
                     }}>Approve</Button>
                    <Button onClick={()=>{
                      handleRejectSchool(details.id)
                    }}>Reject</Button>
                    <Button onClick={()=>{
                      handleFeedBack(details.id)
                    }}>Feed Back</Button>
                  </ButtonGroup>
                  </Box>
        
                
                  </TableCell>
              </React.Fragment>
                  
              :null
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
