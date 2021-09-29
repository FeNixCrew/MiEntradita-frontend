import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Api from '../../helpers/ApiRest';
import Tickets from '../ticket/TicketsCarousel';
import BackdropInherit from '../feedback/Backdrop';

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setOpen(true);
        Api.me()
            .then(response => {
                setTickets(response.data);
            })
            .catch(() => {
                localStorage.clear();
                history.push('/login');
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