import{ useEffect, useState } from 'react';
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
            .catch((e) => {
                console.log(e);
                localStorage.clear();
                history.push('/login');
            });
        setOpen(false);
    },[]);

    return (
        <div>
        <NavBar />
        {( !tickets &&
            <Backdrop open={open}>
             <CircularProgress color="inherit" />
            </Backdrop>) ||
            (   username=== 'admin' &&   
                <QrScan />
            ) ||
            <div>
                <Tickets tickets={tickets} />
            </div>
        }
        </div>
    )
}