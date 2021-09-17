import React, { useState, useEffect } from 'react';
import Tickets from './TicketsCarousel';
import '../App.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import QrScan from './QrScan';
import { useHistory, useLocation } from 'react-router';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Toolbar } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Main() {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const history = useHistory()
  const tickets = location.state.userData;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAdmin = () => {
    return localStorage.getItem('role') === 'admin'
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signOff = () => history.push('/login')

  useEffect(() => {
    document.body.style = "background-color: #fffff;"
  })

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Tickets" {...a11yProps(0)} />
            {isAdmin() && <Tab label="Scanner" {...a11yProps(1)} />}
          </Tabs>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
            sx={{ ml:'60rem' }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={signOff}>Cerrar sesion</MenuItem>
        </Menu>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Tickets tickets={tickets} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="qrscancontainer">
          <QrScan />
        </div>
      </TabPanel>
    </div>
  )
}