import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './ticketCard/TicketCard';
import BeginningTypography from '../BeginningTypography';

export default function Tickets({ tickets }) {

    const renderTickets = () => {
        return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />);
    }

    return (
        <>
            {
                tickets.length > 0 ?
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh', alignItems: 'center' }}>
                        <BeginningTypography text="Tus Entradas" variant="h5"/>

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

