import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tickets from './ticket/TicketsCarousel';
import BackdropInherit from './feedback/Backdrop';
import spectatorService from '../services/SpectatorService';
import SnackBar from '../components/feedback/SnackBar';
import { useToggle } from '../helpers/hooks/useToggle'

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const history = useHistory();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
                setIsLoading(false);
            })
            .catch((_) => {
                setError('Hubo un error al obtener sus entradas, por favor, intente de nuevo.');
                openSnackBar();
                setIsLoading(false);
            });
    }, [history, openSnackBar]);

    return (
        <>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState="error"
                message={error}
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