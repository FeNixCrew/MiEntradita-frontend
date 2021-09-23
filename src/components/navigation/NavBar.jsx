import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/logo1.png';
import { exit } from '../../helpers/usedFunctions'
import LogoutIcon from '@mui/icons-material/Logout';


export default function NavBar() {
    const history = useHistory();
   
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' style={{backgroundColor: '#212121'}}>
            <Toolbar>
            <Avatar sx={{ m: 1, mr: 3}} src={Logo}/>
            <Typography 
            variant="h6" 
            component="div" 
            style={{ 
                flexGrow: 1,
                fontFamily: 'Monospace',
                letterSpacing: 4,
                color: 'white'
             }}>
                Mi Entradita
            </Typography>
            <Button 
                style={{
                    color: '#2e86c1'
                }}
                onClick={() => exit(history)}
                color="inherit"
            >
                <LogoutIcon />
            </Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}