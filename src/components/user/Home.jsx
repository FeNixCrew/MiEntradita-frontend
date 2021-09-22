import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import * as Api from '../../helpers/ApiRest';
import Tickets from '../Tickets';
import NavBar from '../navigation/NavBar';
import BackdropInherit from '../feedback/Backdrop';


export default function Home() {
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
        <div>
            <NavBar />
            {(tickets === null &&
                <BackdropInherit open={open} />)
                ||
                <div>

                    <Tickets tickets={tickets} />
                </div>
            }
        </div>
    )
}