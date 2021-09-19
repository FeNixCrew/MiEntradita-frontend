import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBar() {
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/login');
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mi Entradita
            </Typography>
            <Button 
                onClick={logOut}
                color="inherit"
            >
                <LogoutIcon />
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}