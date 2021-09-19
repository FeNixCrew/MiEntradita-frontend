import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Ticket from './TicketCard';

export default function Tickets({ tickets }) {
    return (
        <div style={{ marginRight: "200px", marginLeft: "200px"}}>
            <Carousel autoPlay={false} animation="slide">
                { 
                    tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />)
                }
            </Carousel>
        </div>
    )
}

