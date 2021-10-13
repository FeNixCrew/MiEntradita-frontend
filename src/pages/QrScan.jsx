import { useState } from 'react';
import { useHistory } from 'react-router';
import QrReader from 'react-qr-reader';

import Grid from '@mui/material/Grid';
import Background from '../assets/scannerBackground.png'
import { CssBaseline } from '@material-ui/core';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { Alert } from '../components/feedback/Alert'
import BackdropInherit from '../components/feedback/Backdrop';
import SnackBar from '../components/feedback/SnackBar';

import { useToggle } from '../helpers/hooks/useToggle'
import { exit } from '../helpers/usedFunctions';
import matchService from '../services/MatchService';

const scannerStyle = {
  height: '64vh',
  width: '64vh',
}

export default function QrScan() {
  const [scanMessage, setScanMessage] = useState(null);
  const [resultState, setResultState] = useState(null);
  const [open, handleClose, handleToggle] = useToggle();
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const history = useHistory();

  const handleScan = data => {
    if (data) {
      console.log(data);
      let userId= null;
      let matchId = null;

      try {
        const obtainedData = JSON.parse(data);
        userId = obtainedData.userId;
        matchId = obtainedData.matchId;
      } catch(_) {
        setResultState('error');
        setScanMessage('Entrada inválida. Por favor, descargue su entrada desde nuestra web')
        openSnackBar();
      }

      if(userId && matchId){
        handleToggle();
        matchService.comeIn(userId, matchId)
        .then(response => {
          setResultState('success');
          setScanMessage(response.data);
          openSnackBar();
        })
        .catch((err) => {
          setResultState('error');
          if (err.response.status ===400){
            setScanMessage(err.response.data.message);
          } else {
            setScanMessage('Hubo un error de sistema, por favor, pida asistencia')  
          }
          openSnackBar();
        });
        handleClose();
      }
    }
  }

  const handleError = _ => {
    setResultState('error');
    setScanMessage('Error al escanear entrada. Intente de nuevo.')
    openSnackBar();
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
        <Alert severity="info" sx={{ textAlign: 'center', ml: '5%', mt: '2vh', mr: '5%'}}>Coloque su codigo QR frente a la camara y centrelo</Alert>
      </Grid>
      </Grid>
      <Grid 
        item 
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <SnackBar
          openSnackBar={isOpenSnack}
          severityState={resultState}
          message={scanMessage}
          closeSnackBar={closeSnackBar}
          position={{vertical: 'top', horizontal: 'right'}}
        /> 
      </Grid>
    </Grid >
  )
}
