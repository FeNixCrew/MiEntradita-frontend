import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';


export const theme = createTheme();

export const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

