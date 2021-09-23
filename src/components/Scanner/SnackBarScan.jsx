import { Alert } from '../feedback/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useStyles } from './styles';

function SnackBarScan({ openSnackBarComeIn, handleCloseSnackBar, comeIn, state }) {

    const classes = useStyles();

    return (
        <div className={classes.messageContainer}>
            <Snackbar open={openSnackBarComeIn}
                autoHideDuration={5000} 
                onClose={handleCloseSnackBar}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <Alert 
                    severity={state} 
                    onClose={handleCloseSnackBar} 
                    sx={{ width: '100%' }}
                >
                {comeIn}
                </Alert>
            </Snackbar>
        </div>)
}

export default SnackBarScan;