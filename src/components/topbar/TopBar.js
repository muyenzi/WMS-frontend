import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import topbar from "./topbar.css";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function TopBar() {


  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <AppBar
        position="sticky"
        color="inherit"
        elevation={2}
      

        sx={{
            backgroundColor: "#ffff",
            position: "sticky",
            top: "0",
            Zindex: "999",
          }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
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
            
          </Typography>
        </Toolbar>
      </AppBar>
    
    </ThemeProvider>
  );
}