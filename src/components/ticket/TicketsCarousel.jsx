import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './ticketCard/TicketCard';
import CoustomTypography from '../CoustomTypography';
import { makeStyles } from '@material-ui/core';
import { useStylesDesktop, useStylesMobile } from './ticketCard/styles';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
    carousel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    }
}))


export default function Tickets({ tickets }) {
    const classes = useStyles();

    const renderTickets = () => {
        if(isMobile) {
            return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} styleClasses={useStylesMobile} /> )
        } else {
            return  tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} styleClasses={useStylesDesktop} /> )
        }
    }

    return (
        <>
            <div style={{ marginTop: '7vh' }} />
            <div className={classes.carousel}>
                {
                    tickets.length > 0 ?
                        <div data-testid='carousel-div'>
                            <CoustomTypography text="Tus Entradas" variant="h5" />
                            <Carousel
                                autoPlay={false}
                                animation="slide"
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: '#2e86c1',
                                        borderRadius: 10,
                                        padding: '5px'
                                    }
                                }}
                            >
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

