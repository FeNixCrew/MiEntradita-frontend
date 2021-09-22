import { useState } from 'react';
import { useHistory } from 'react-router';
import QrReader from 'react-qr-reader';
import * as Api from '../../helpers/ApiRest';
import { scannerStyle } from './styles';
import Grid from '@mui/material/Grid';
import Background from '../../assets/scannerBackground.png'
import { CssBaseline } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Alert } from '../feedback/Alert'
import { exit } from '../../helpers/usedFunctions'
import BackdropInherit from '../feedback/Backdrop';
import SnackBarScan from './SnackBarScan';

export default function QrScan() {
  const [comeIn, setComeIn] = useState(null);
  const [resultState, setResultState] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSnackBarComeIn, setOpenSnackBarComeIn] = useState(false);
  const history = useHistory();

  const handleScan = data => {
    if (data) {
      const { userId, matchId } = JSON.parse(data);
      setOpen(true);
      Api.comeIn(userId, matchId)
        .then(response => {
          setResultState('success');
          setComeIn(response.data);
          setOpenSnackBarComeIn(true);
        })
        .catch((err) => {
          console.log(err.response.data);
          setResultState('error');
          setComeIn(err.response.data.message);
          setOpenSnackBarComeIn(true);
        });
      setOpen(false);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  const handleCloseSnackBar = () => {
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
        sm={8} 
        md={5} 
        sx={{ backgroundColor: '#212121' }}
      >
      <BackdropInherit open={open} />
      <Button
        style={{
          color: '#2e86c1'
        }}
        onClick={() => exit(history)}
        sx={{
          mt: '1vh'
        }}>
        <ExitToAppIcon />
      </Button>
      <Grid
        sx={{
          display: 'grid',
          justifyContent: 'center',
          mt: '5vh'
        }}>
        <QrReader
          delay={5000}
          onError={handleError}
          onScan={handleScan}
          style={scannerStyle}
        />
        <Alert severity="info" sx={{ m: 4 }}>Coloque su codigo QR frente a la camara y centrelo</Alert>
      </Grid>
      </Grid>
      <Grid 
        item 
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
      >
        <SnackBarScan
          openSnackBarComeIn={openSnackBarComeIn}
          state={resultState}
          comeIn={comeIn}
          handleCloseSnackBar={handleCloseSnackBar}
        />
      </Grid>
    </Grid >
  )
}
