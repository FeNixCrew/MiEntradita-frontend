import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tickets from '../ticket/TicketsCarousel';
import BackdropInherit from '../feedback/Backdrop';
import spectatorService from '../../services/SpectatorService';

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const history = useHistory();

    useEffect(() => {
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [history]);

    return (
        <>
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