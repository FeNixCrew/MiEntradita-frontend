import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory } from 'react-router';

export default function HamburguerMenu({open, handleClose }) {
    const history = useHistory()
    const username = localStorage.getItem('username')

    const goToScanner = () => history.push(`/main/${username}/scanner`)
    const goToTickets = () => history.push(`/main/${username}/tickets`)
   
    return (
        <Menu
            id="menu-appbar"
            anchorEl={open}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(open)}
            onClose={handleClose}
        >
            <MenuItem onClick={goToTickets}>Tickets</MenuItem>
            <MenuItem onClick={goToScanner}>Scanner</MenuItem>
        </Menu>
    )









}