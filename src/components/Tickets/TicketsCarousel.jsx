import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './TicketCard/TicketCard';
import { Typography } from '@material-ui/core';
import NavBar from '../navigation/NavBar';

export default function Tickets({ tickets }) {
    return (
        <div>
            <NavBar />
            {(tickets.length > 0 &&
                <div style={{ marginRight: '40vh', marginLeft: '40vh', marginTop: '7vh' }}>
                    <Typography
                        variant="h5"
                        component="div"
                    >
                        Tus Tickets
                    </Typography>
                    <Carousel autoPlay={false} animation="slide">
                        {
                            tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />)
                        }
                    </Carousel>
                </div>) || <h2> No tienes entradas reservadas disponibles!</h2>
            }
        </div>
    )
}

