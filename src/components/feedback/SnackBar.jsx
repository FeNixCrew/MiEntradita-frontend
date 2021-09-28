import { Alert } from './Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    messageContainer: {
      'margin-top': '5vh'
    }
  }));

function SnackBar({ openSnackBar, closeSnackBar, message, severityState, position }) {
    const classes = useStyles();

    return (
        <div className={classes.messageContainer}>
            <Snackbar open={openSnackBar}
                autoHideDuration={5000} 
                onClose={closeSnackBar}
                anchorOrigin={position}
            >
                <Alert 
                    severity={severityState} 
                    onClose={closeSnackBar} 
                    sx={{ width: '100%' }}
                >
                {message}
                </Alert>
            </Snackbar>
        </div>)
}

export default SnackBar;