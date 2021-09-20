import React, { useState, forwardRef } from 'react';
import { useHistory } from 'react-router';
import QrReader from 'react-qr-reader';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Api from '../../helpers/ApiRest';
import { scannerStyle } from './styles';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Background from '../../assets/scannerBackground.png'
import { CssBaseline } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


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
  const history = useHistory();

  const exit = () => {
    localStorage.clear();
    history.push('/login');
  }

  const handleScan = data => {
    if (data) {
      const { userId, matchId } = JSON.parse(data);
      setOpen(true);
      Api.comeIn(userId, matchId)
        .then(response => {
          setComeIn(response.data);
          setOpenSnackBarComeIn(true);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setOpenSnackBarError(true)
        });
      setOpen(false);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  const handleCloseSnackBar = () => {
    setOpenSnackBarError(false);
    setOpenSnackBarComeIn(false);
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh'
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ backgroundColor: '#212121' }}>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Button
          onClick={exit}
          color="primary"
          sx={{
            mt: 1,
            ml: 63
          }}>
          <ExitToAppIcon />
        </Button>
        <Grid
          sx={{
            display: 'grid',
            justifyContent: 'center',
            mt: 10
          }}>
          <QrReader
            delay={5000}
            onError={handleError}
            onScan={handleScan}
            style={scannerStyle}
          />
          <Alert severity="info" sx={{ m: 4 }}>Coloque el QR adentro del cuadro rojo</Alert>
        </Grid>
        <div className={classes.messageContainer}>
          <Snackbar open={openSnackBarError} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert severity="error" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{error}</Alert>
          </Snackbar>
          <Snackbar open={openSnackBarComeIn} autoHideDuration={5000} onClose={handleCloseSnackBar}>
            <Alert severity="success" onClose={handleCloseSnackBar} sx={{ width: '100%' }}>{comeIn}</Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid >
  )
}
