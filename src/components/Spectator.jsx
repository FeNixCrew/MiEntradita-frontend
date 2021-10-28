import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tickets from './ticket/TicketsCarousel';
import BackdropInherit from './feedback/Backdrop';
import spectatorService from '../services/SpectatorService';
import SnackBar from '../components/feedback/SnackBar';
import { useToggle } from '../helpers/hooks/useToggle';
import { useSnackbar } from '../helpers/hooks/useSnackbar';

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const history = useHistory();
    const [isLoading, handleClose, handleToggle] = useToggle();
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();

    useEffect(() => {
        handleToggle();
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
                handleClose();
            })
            .catch((_) => {
                setError('Hubo un error al obtener sus entradas, por favor, intente de nuevo.');
                handleClose();
            });
    }, [history]);

    return (
        <>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />

            {
                tickets === null ?
                    <BackdropInherit open={isLoading} />
                    :
                    <Tickets tickets={tickets} />

            }
        </>
    )
}

export default Spectator;