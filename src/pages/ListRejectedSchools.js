import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { useDispatch,useSelector } from 'react-redux';
// mock
import USERLIST from '../_mock/user';

import { getUsersAction } from "../redux/actions/getUsersAction";
import { addUserAction } from 'src/redux/actions/addUserAction';
import { getRejectedSchoolsAction } from '../redux/actions/rejectedSchoolsAction';

import Collapse from "@mui/material/Collapse";
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton} from '@mui/material';
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
  { id: 'how_long', label: 'How Long', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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

export default function ListRejectedSchools() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [role, setRole] = React.useState('User');
  const [fullname,setFullname]=useState('')
  const [usersDetails,setUsersDetails]=useState([])
 const dispatch=useDispatch();
 const getAllUsers=useSelector(state=>state.getUsers);
 const addUser=useSelector(state=>state.addUser);
 const rejectedSchools=useSelector(state=>state.rejectedSchools)
 const [schoolsDetails,setSchoolsDetails]=useState([])

const handleAddNewUser=async()=>{
await dispatch(addUserAction({fullname,role},navigator))
if(addUser.error){
  setOpen(true)
}
if(addUser.users){
  setOpenSuccess(true)
}
setFullname('')
setRole('User')
}
 useEffect(() => {
  async function fetchData() {
   // await dispatch(getUsersAction())
    await dispatch(getRejectedSchoolsAction())
    if (!rejectedSchools.loading) {
      if (rejectedSchools.details) {
        setSchoolsDetails(rejectedSchools.details)
      }
    }
  }
  fetchData();
}, [rejectedSchools.details]);
  const handleChange = (event) => {
    setRole(event.target.value);
    setFullname(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccess(false)
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersDetails.map((n) => n.fullname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <React.Fragment>
     <Page title="User">
      <Container>
      
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            List of Rejected Schools
          </Typography>
          
        </Stack>

        <Card>
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={schoolsDetails.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {schoolsDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl} = row;
                    const isItemSelected = selected.indexOf(name) !== -1;
                    console.log("lllly g",usersDetails)
                    return (
                   
                      <TableRow
                        hover
                        key={row.id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                      <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, fullname)} />
                    </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                       
                        <Typography variant="subtitle2" noWrap>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{row.source}</TableCell>
                    <TableCell align="left">{row.how_long}</TableCell>
                    <TableCell align="left">{row.level}</TableCell>
                    {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                    <TableCell align="left">
                    
                      <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                       {row.status}
                      </Label>
                      
                    </TableCell>

                    <TableCell align="right">
                      <UserMoreMenu />
                    </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
    

    </React.Fragment>
   
  );
}
