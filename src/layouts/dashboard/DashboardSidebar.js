import PropTypes from 'prop-types';
import { useEffect ,useState} from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography,  Stack } from '@mui/material';
// mock

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
import navConfigAdmin from './NavConfigAdmin'
import navConfigUser from './NavConfigUser';
//import navConfigAdmin from './NavConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
 const [fullname,setFullname]=useState('')
 const [role,setRole]=useState('');
 const navigate=useNavigate()
 
  const isDesktop = useResponsive('up', 'lg');
  const handleLogout=()=>{
    localStorage.removeItem('wmsAuth')
    localStorage.removeItem('userAuth')
    navigate('/login',)
  }
  useEffect(() => {

    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const auth=localStorage.getItem("wmsAuth")
    const userAuth=localStorage.getItem("userAuth")
    if(auth && userAuth){
      const  {role} =JSON.parse(userAuth)
      const { fullName}=JSON.parse(userAuth)
      setFullname(fullName)
      setRole(role)
    }

  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', backgroundColor:"#ffff"}}>
      <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <img
              src="../../../static/images/logo.png"
              alt=""
              className="topAvatar"
              
            />
          </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            {/* <Avatar src={account.photoURL} alt="photoURL" /> */}
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {fullname}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
    {/* condition */}
   {role=="Admin"?
   <NavSection navConfig={navConfigAdmin} /> :null
  
  }
  {
    role=="SuperAdmin"?
    <NavSection navConfig={navConfig} />:null
  }

  {
    role=="User"?
    <NavSection navConfig={navConfigUser} />:null
  }
      

      
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
         
          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              WM System
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            
            </Typography>
          </Box>

          <Button onClick={handleLogout} target="_blank" variant="contained">
            Logout
          </Button>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
