import { Alert } from '../feedback/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useStyles } from './styles';

function SnackBarScan({ openSnackBarComeIn, openSnackBarError, handleCloseSnackBar, comeIn, error }) {

    const classes = useStyles();

    return (
        <div className={classes.messageContainer}>
            <Snackbar open={openSnackBarError} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert severity="error" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>
            <Snackbar open={openSnackBarComeIn} autoHideDuration={5000} onClose={handleCloseSnackBar}>
                <Alert severity="success" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{comeIn}</Alert>
            </Snackbar>
        </div>)
}

export default SnackBarScan;