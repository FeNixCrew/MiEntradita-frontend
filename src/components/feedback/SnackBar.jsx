import { Alert } from './Alert';
import Snackbar from '@mui/material/Snackbar';

function SnackBar({ openSnackBar, closeSnackBar, message, severityState, position }) {
    return (
        <div>
            <Snackbar open={openSnackBar}
                autoHideDuration={5000} 
                onClose={closeSnackBar}
                anchorOrigin={position}
            >
                <Alert 
                    severity={severityState} 
                    onClose={closeSnackBar} 
                    style={{ 
                        width: '100%',
                        backgroundColor: severityState === 'error' ? '#d32f2f' : '#2e7d32',
                        color: 'white'}}
                >
                {message}
                </Alert>
            </Snackbar>
        </div>)
}

export default SnackBar;