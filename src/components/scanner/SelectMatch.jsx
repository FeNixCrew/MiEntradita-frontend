import { useEffect, useState } from 'react';

import BackdropInherit from '../feedback/Backdrop';
import SnackBar from '../feedback/SnackBar';

import { useToggle } from '../../helpers/hooks/useToggle';
import matchService from '../../services/MatchService';
import AvailableMatch from './AvailableMatch';

export default function SelectMatch({setMatch}) {
  const [isLoading, setIsLoading] = useState(false);
  const [matchs, setMatchs] = useState([]);
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const [scanMessage, setScanMessage] = useState(null);
  const [resultState, setResultState] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    matchService.getTodayMatchs()
      .then(response => {
        setMatchs(response.data);     
      })
      .catch(_ => {
        setScanMessage('No se pudo obtener los partidos de hoy. Por favor, refresque la pagina.')
        setResultState('error');
        openSnackBar(); 
      })
      setIsLoading(false);
  }, [openSnackBar]);

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