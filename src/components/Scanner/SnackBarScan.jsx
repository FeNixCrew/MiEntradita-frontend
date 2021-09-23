import { Alert } from '../feedback/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useStyles } from './styles';

function SnackBarScan({ openSnackBar, closeSnackBar, scanMessage, state }) {

    const classes = useStyles();

    return (
        <div className={classes.messageContainer}>
            <Snackbar open={openSnackBar}
                autoHideDuration={5000} 
                onClose={closeSnackBar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert 
                    severity={state} 
                    onClose={closeSnackBar} 
                    sx={{ width: '100%' }}
                >
                {scanMessage}
                </Alert>
            </Snackbar>
        </div>)
}

export default SnackBarScan;