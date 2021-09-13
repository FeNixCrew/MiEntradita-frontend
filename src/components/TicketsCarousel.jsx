import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { tickets } from '../datos';
import Ticket from './TicketCard';

export default function Tickets(props) {
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

