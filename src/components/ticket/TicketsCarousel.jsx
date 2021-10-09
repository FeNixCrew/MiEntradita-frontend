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
        <div style={{ margin: '2vh auto', display: 'flex', flexDirection: 'column', textAlign:'center', alignItems: 'center' }}>
        {
            tickets.length > 0 ?
                      <div>  
                        <BeginningTypography text="Tus Entradas" variant="h5"/>
                        <Carousel autoPlay={false} animation="slide">
                            {renderTickets()}
                        </Carousel> 
                        </div>
                        :
                        <BeginningTypography text='No tienes entradas reservadas disponibles!' variant="h5"/>
                    }
                    </div>
        </>
    )
}

