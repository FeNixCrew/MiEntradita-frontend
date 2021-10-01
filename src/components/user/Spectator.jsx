import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tickets from '../ticket/TicketsCarousel';
import BackdropInherit from '../feedback/Backdrop';
import spectatorService from '../../services/SpectatorService';

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setOpen(true);
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
            })
            .catch((err) => {
                console.log(err)
            });
        setOpen(false);
    }, [history]);

    return (
        <>
            {
                tickets === null ?
                    <BackdropInherit open={open} />
                    :
                    <Tickets tickets={tickets} />

            }
        </>
    )
}

export default Spectator;