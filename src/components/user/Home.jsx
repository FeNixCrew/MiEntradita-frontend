import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { Backdrop, CircularProgress } from '@material-ui/core';

import * as Api from '../../helpers/ApiRest';
import Tickets from '../Tickets/TicketsCarousel';
import QrScan from '../Scanner/QrScan';
import NavBar from '../navigation/NavBar';

export default function Home() {
    const [tickets, setTickets] = useState(null);
    const [open, setOpen] = useState(false);
    const username = localStorage.getItem('username');
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
            {(!tickets &&
                <Backdrop open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>) ||
                (username === 'scanner' &&
                    <QrScan />
                ) ||
                <div>
                    <NavBar />
                    <Tickets tickets={tickets} />
                </div>
            }
        </div>
    )
}