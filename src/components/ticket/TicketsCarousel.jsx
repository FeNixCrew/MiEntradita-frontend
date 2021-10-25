import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './ticketCard/TicketCard';
import CoustomTypography from '../CoustomTypography';

export default function Tickets({ tickets }) {

    const renderTickets = () => {
        return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />);
    }

    return (
        <>
            <div style={{ marginTop: '7vh' }}/>
            <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                {
                    tickets.length > 0 ?
                        <div data-testid='carousel-div'>
                            <CoustomTypography text="Tus Entradas" variant="h5" />
                            <Carousel autoPlay={false} animation="slide">
                                {renderTickets()}
                            </Carousel>
                        </div>
                        :
                        <CoustomTypography text='No tienes entradas reservadas disponibles!' variant="h5" />
                }
            </div>
        </>
    )
}

