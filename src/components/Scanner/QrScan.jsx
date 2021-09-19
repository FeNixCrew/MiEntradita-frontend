import React, { useState, forwardRef } from 'react'
import QrReader from 'react-qr-reader'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Api from '../../helpers/ApiRest'
import { scannerStyle } from './styles';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    messageContainer: {
      'margin-top': '5vh'
    }
  },
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function QrScan() {
  const [comeIn, setComeIn] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  const [openSnackBarComeIn, setOpenSnackBarComeIn] = useState(false);

  const classes = useStyles();

  const resetMessages = () => {
    setComeIn(null);
    setError(null);
  }

  const handleScan = data => {
    resetMessages();
    if (data) {
      const { userId, matchId } = JSON.parse(data);
      setOpen(true);
      Api.comeIn(userId, matchId)
        .then(response => {
          setComeIn(response.data);
          setOpenSnackBarComeIn(true);
        })
        .catch((err) => { setError(err.response.data.message); setOpenSnackBarError(true) });
      setOpen(false);
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const handleCloseSnackBar = () => {
    setOpenSnackBarError(false);
    setOpenSnackBarComeIn(false);
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <QrReader
        delay={5000}
        onError={handleError}
        onScan={handleScan}
        style={scannerStyle}
      />
      <div className={classes.messageContainer}>
        <Snackbar open={openSnackBarError} autoHideDuration={3000} onClose={handleCloseSnackBar}>
          <Alert severity="error" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{error}</Alert>
        </Snackbar>
        <Snackbar open={openSnackBarComeIn} autoHideDuration={3000} onClose={handleCloseSnackBar}>
          <Alert severity="success" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{comeIn}</Alert>
        </Snackbar>
      </div>
    </div>
  )
}
