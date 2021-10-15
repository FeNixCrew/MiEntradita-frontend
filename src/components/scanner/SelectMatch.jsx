import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import BackdropInherit from '../feedback/Backdrop';
import SnackBar from '../feedback/SnackBar';

import { useToggle } from '../../helpers/hooks/useToggle';
import matchService from '../../services/MatchService';
import AvailableMatch from './AvailableMatch';
import { exit } from '../../helpers/usedFunctions';

export default function SelectMatch({setMatch}) {
  const [isLoading, setIsLoading] = useState(false);
  const [matchs, setMatchs] = useState(null);
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const [scanMessage, setScanMessage] = useState(null);
  const [resultState, setResultState] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    matchService.getTodayMatchs()
      .then(response => {
        setMatchs(response.data);
        setIsLoading(false);
      })
      .catch(_ => {
        setScanMessage('No se pudo obtener los partidos de hoy. Por favor, refresque la pagina.')
        setResultState('error');
        openSnackBar(); 
        setIsLoading(false);
      })
  }, [openSnackBar]);

  const renderAvailableGames = () => matchs.map(match => <AvailableMatch match={match} setMatch={setMatch}/>);

  return (
    <div style={{
      display: 'grid',
      'grid-template-columns': 'repeat(auto-fit, auto-fit)',
      'grid-gap': '1vw',
      'justify-content': 'center',
      'height': '100vh'
    }}>
    { !matchs ?
      <BackdropInherit open={isLoading} />
        : matchs.length === 0 ?
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{color: '#EEEEEE'}}>No hay partidos disponibles, inténtelo más tarde</h2>
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
          </div>
          :
          <div>
            <h1 style={{color: '#EEEEEE'}}>De qué partido desea validar entradas?</h1>
            {renderAvailableGames()}
          </div>
      }
    <SnackBar
      openSnackBar={isOpenSnack}
      severityState={resultState}
      message={scanMessage}
      closeSnackBar={closeSnackBar}
      position={{vertical: 'bottom', horizontal: 'right'}}
    /> 
    </div>
  )
}