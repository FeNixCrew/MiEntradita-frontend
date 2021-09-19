import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';


export const theme = createTheme();

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    error: {
        backgroundColor: '#FF7575',
        'text-align': 'center',
        'border-radius': '5px'
    },
    loginButton: {
        backgroundColor: '#44CD3A'
    }
}));

