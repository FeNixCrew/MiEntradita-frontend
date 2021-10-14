import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import QrReader from 'react-qr-reader';

import Grid from '@mui/material/Grid';
import Background from '../assets/scannerBackground.png'
import { CssBaseline } from '@material-ui/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SyncIcon from '@mui/icons-material/Sync';

import { Alert } from '../components/feedback/Alert'
import BackdropInherit from '../components/feedback/Backdrop';
import SnackBar from '../components/feedback/SnackBar';

import { useToggle } from '../helpers/hooks/useToggle'
import { exit, formatDateAndTime } from '../helpers/usedFunctions';
import matchService from '../services/MatchService';

const scannerStyle = {
  height: '64vh',
  width: '64vh',
}

const availableMatchs = [
  {
    id: 999,
    home: 'x',
    away: 'asd',
    matchStartTime: new Date()
  },
  {
    id: 2,
    home: 'segundo',
    away: 'equipo3',
    matchStartTime: new Date()
  },
  {
    id: 3,
    home: 'equipo4',
    away: 'equipo5',
    matchStartTime: new Date()
  },
  {
    id: 4,
    home: 'equipo6',
    away: 'equipo7',
    matchStartTime: new Date()
  },
]

export default function QrScan() {
  const [match, setMatch] = useState(null);
  
  return(
    <div>
      {
        match ?
          <Scanner match={match} setMatch={setMatch}/>
          :
          <SelectMatch setMatch={setMatch}/>
      }
    </div>
  )
}

function AvailableMatch({match, setMatch}) {
    return (
        <div>
        <Grid item md={12} style={{marginTop:'2vh'}}>
            <Card style={{ padding: 1}}>
                <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                        {`${match.home} vs ${match.away}`}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                      {formatDateAndTime(match.matchStartTime)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{color: '#2e86c1'}} onClick={() => setMatch(match)}>Seleccionar</Button>
                </CardActions>
            </Card>
        </Grid>
        </div>
    );
}
function SelectMatch({setMatch}) {
  const [isLoading, setIsLoading] = useState(false);
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setMatchs(availableMatchs);
    setIsLoading(false);
  }, [matchs]);

  const renderAvailableGames = () => matchs.map(match => <AvailableMatch match={match} setMatch={setMatch}/>);

  return (
    <div style={{
      display: 'grid',
      'grid-template-columns': 'repeat(auto-fit, auto-fit)',
      'grid-gap': '1vw',
      'justify-content': 'center',
    }}>
    <BackdropInherit open={isLoading} />
      { matchs.length === 0 ?
          <h2>No hay partidos disponibles, inténtelo más tarde</h2>
          :
          <div>
            <h1>De qué partido desea validar entradas?</h1>
            {renderAvailableGames()}
          </div>
      }
    </div>
  )
}

function Scanner({match, setMatch}) {
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

      if(matchId !== match.id) {
        setResultState('error');
        setScanMessage('Su entrada pertenece a otro partido.');
        openSnackBar();
        return;
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
          severityState={resultState}
          message={scanMessage}
          closeSnackBar={closeSnackBar}
          position={{vertical: 'top', horizontal: 'right'}}
        /> 
      </Grid>
    </Grid >
  )
}
