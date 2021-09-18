import React from 'react';
import { useHistory } from "react-router";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export default function UserMenu({open,handleClose}) {
    const history = useHistory();
    const signOff = () => history.push('/login')

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
            <MenuItem onClick={signOff}>Cerrar sesion</MenuItem>
        </Menu>
    )
}