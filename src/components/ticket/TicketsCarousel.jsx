import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './ticketCard/TicketCard';
import { Typography } from '@material-ui/core';

export default function Tickets({ tickets }) {

    const renderTickets = () => {
        return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />);
    }

    return (
        <>
            {
                tickets.length > 0 ?
                    <div style={{ marginRight: '40vh', marginLeft: '40vh', marginTop: '7vh' }}>
                        <Typography
                            variant="h5"
                            component="div"
                        >
                            Tus Entradas
                        </Typography>
                        <Carousel autoPlay={false} animation="slide">
                            {renderTickets()}
                        </Carousel>
                    </div>
                :
                <h2> No tienes entradas reservadas disponibles!</h2>
            }
        </>
    )
}

