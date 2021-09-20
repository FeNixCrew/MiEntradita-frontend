import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './TicketCard/TicketCard';

export default function Tickets({ tickets }) {
    return (
        <div style={{ marginRight: '40vh', marginLeft: '40vh', marginTop: '7vh'}}>
            <Carousel autoPlay={false} animation="slide">
                { 
                    tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />)
                }
            </Carousel>
        </div>
    )
}

