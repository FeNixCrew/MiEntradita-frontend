import React, { useState } from 'react';
import '../../App.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Toolbar } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import HamburguerMenu from './HamburguerMenu';
import UserMenu from './UserMenu';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NavigationBar({value, setValue}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openHamburguer, setOpenHambueguer] = useState(null)
  
    const handleOpenUserMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleHamburguerMenu = (event) => {
      setOpenHambueguer(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorEl(null);
    };
  
    const handleCloseHamburguer = () => {
      setOpenHambueguer(null);
    };
  
    const isAdmin = () => {
      return localStorage.getItem('role') === 'admin'
    }
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    return (
        <AppBar position="static">
            <Toolbar variant='dense'>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleHamburguerMenu}
                    sx={{ mr: 8 }}
                >
                    <MenuIcon />
                </IconButton>
                {/* <HamburguerMenu open={openHamburguer} handleClose={handleCloseHamburguer} /> */}
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
                    onClick={handleOpenUserMenu}
                    sx={{ ml: '53rem' }}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
            <UserMenu open={anchorEl} handleClose={handleCloseUserMenu}/>
        </AppBar>
    )
}