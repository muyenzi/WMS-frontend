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
import { getHouseholdsAction } from '../redux/actions/houseHoldAction';
import { getHealthfacilitiesAction } from 'src/redux/actions/healthfacilitiesAction';

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

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState('User');
  const [usersDetails,setUsersDetails]=useState('')
  const [ houseHoldsDetails, setHouseHoldsDetails]=useState([])
  const [healthFacilitiesDetails,setHealthFacilitiesDetails]=useState([])
 const dispatch=useDispatch();
 const getAllUsers=useSelector((state)=>state.getUsers);
 const getSchools=useSelector((state)=>state.getSchools);
 const getHouseHolds=useSelector((state)=>state.getHouseHolds)
 const getHealthfacilities=useSelector((state)=>state.getHealthfacilities);

 const [openFeedBack,setOpenFeedBack]=useState(false)
 const [limit, setLimit] = useState(5);
 const [selectedExamIds, setSelectedExamIds] = useState([]);
 const [results, setResults] = useState({});
 const [search, setSearch] = useState(false);
 const [textMessage,setTextMessage]=useState('')

   const todaydate=new Date().toISOString().slice(0,10);
   const generateListOfApprovedHealthfacilities =()=> {
    const doc = new jsPdf();
    doc.addImage(logo, "JPEG", 20, 5, 40, 40);
    doc.setFont("Helvertica", "normal");
    doc.text("Water Management System", 20, 50);
    doc.text(`MININFRA`, 20, 55);
    doc.text("Email: info@mininfra.gov.rw", 20, 60);
    doc.setFont("Helvertica", "normal");
    doc.text(`Date ${todaydate}`, 140, 65);
    doc.setFont("Helvertica", "bold");
    doc.text("Liste of rejected healthfacilities", 70, 75);
     const tableColumn=['Name','Province','District','Source','status']
    const tableRows=[]
  
    healthFacilitiesDetails.map(h =>{
      const householdData=[
        h.name,
        h.prov_name,
        h.dis_name,
        h.source,
        h.status,
  
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
  
  
  const handleFeedBack=async(id)=>{
    console.log("idd",id)
    const url=`http://localhost:8000/api/messages/${id}`
    await axios.get(url)
    .then(function (response) {
      console.log(response.data);
      setTextMessage(response.data.data.message)
    
    })
    .catch(function (error) {
      console.log(error);
    });
    setOpenFeedBack(true)
   }

 useEffect(() => {
  async function fetchData() {
   // await dispatch(getUsersAction())
    await dispatch(getHealthfacilitiesAction())
    if (!getHealthfacilities.loading) {
      if (getHealthfacilities.details) {
        setHealthFacilitiesDetails(getHealthfacilities.details)
      }
    }
  }
  fetchData();
}, [getHealthfacilities.details]);
  const handleChange = (event) => {
    setRole(event.target.value);
  };


  const handleClose = () => {
    setOpen(false);
    setTextMessage('')
    setOpenFeedBack(false)
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
      for (var i = 0; i < healthFacilitiesDetails.length; i++) {
        for (var key in healthFacilitiesDetails[i]) {
          if (healthFacilitiesDetails[i][key] != null) {
            if (
                healthFacilitiesDetails[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, healthFacilitiesDetails[i]))
                results.push(healthFacilitiesDetails[i]);
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
    <DialogTitle>The information was rejected due to the following reasons:</DialogTitle>
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
    {
      textMessage?
      <Typography>
      {textMessage}
     </Typography>:null
    }
   
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
          List of Rejected HealthFacilities
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
          
         
          </Box>

  </Box>
        <Table aria-label="caption table">
          <caption className="textTitle">HealthFacilities List</caption>
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
              <TableCell align="center">Name</TableCell>
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
                details.status=="Rejected"?
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
                  
                  <Button onClick={()=>{
                    handleFeedBack(details.id)
                  }}>Message</Button>
                </ButtonGroup>
                </Box>
      
              
                </TableCell>
                </React.Fragment>:null
              }
                
              </TableRow>
              ))}
              </React.Fragment>
            ):(
              <React.Fragment>
              {healthFacilitiesDetails.slice(0, limit).map((details) => (
              <TableRow
                hover
                key={details.id}
                selected={selectedExamIds.indexOf(details.id) !== -1}
              >
              {details.status=="Rejected"?
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
              
              <Button onClick={()=>{
                handleFeedBack(details.id)
              }}>Message</Button>
            </ButtonGroup>
            </Box>
  
          
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
