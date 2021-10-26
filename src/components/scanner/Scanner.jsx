import { useHistory } from 'react-router';
import QrReader from 'react-qr-reader';

import Grid from '@mui/material/Grid';
import Background from '../../assets/scannerBackground.png'
import { CssBaseline } from '@material-ui/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import SyncIcon from '@mui/icons-material/Sync';
import { Alert } from '..//feedback/Alert'
import BackdropInherit from '../feedback/Backdrop';
import SnackBar from '../feedback/SnackBar';

import { useToggle } from '../../helpers/hooks/useToggle';
import { useSnackbar } from '../../helpers/hooks/useSnackbar';
import { exit } from '../../helpers/usedFunctions';
import matchService from '../../services/MatchService';

const scannerStyle = {
    height: '64vh',
    width: '64vh',
  }

export default function Scanner({match, setMatch}) {
    const [open, handleClose, handleToggle] = useToggle();
    const history = useHistory();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
  
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
          setError('Entrada inválida. Por favor, descargue su entrada desde nuestra web');
        }
  
        if(matchId !== match.id) {
          setError('Su entrada pertenece a otro partido.');
          return;
        }
        if(userId && matchId){
          handleToggle();
          matchService.comeIn(userId, matchId)
          .then(_ => {
            setSuccess('Bienvenido al partido! Esperamos que disfrute del encuentro.');
          })
          .catch((err) => {
            const msg = err.response.status===400 ? err.response.data.message : 'Hubo al validar su entrada. Intente de nuevo.';
            setError(msg);
          });
          handleClose();
        }
      }
    }
  
    const handleError = _ => {
      setError('Error al escanear entrada. Intente de nuevo.')
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
        <Button
          style={{
            color: '#2e86c1'
          }}
          onClick={() => setMatch(null)}
          sx={{
            mt: '1vh'
          }}>
          <SyncIcon />
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
          <Alert severity="info" sx={{ textAlign: 'center', ml: '5%', mt: '2vh', mr: '5%'}}>
          Coloque su código QR frente a la cámara y céntrelo
          </Alert>
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
            severityState={severity}
            message={message}
            closeSnackBar={closeSnackBar}
            position={{vertical: 'top', horizontal: 'right'}}
          /> 
        </Grid>
      </Grid >
    )
  }