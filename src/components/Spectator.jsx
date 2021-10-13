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

    useEffect(() => {
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
            })
            .catch((err) => {
                setError(err);
                openSnackBar();
            });
    }, [history]);

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
                    <BackdropInherit open={true} />
                    :
                    <Tickets tickets={tickets} />

            }
        </>
    )
}

export default Spectator;