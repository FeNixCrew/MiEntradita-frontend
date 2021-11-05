import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Ticket from './ticketCard/TicketCard';
import CoustomTypography from '../CoustomTypography';
import { makeStyles } from '@material-ui/core';
import { useStylesDesktop, useStylesMobile } from './ticketCard/styles';
import { isMobile } from 'react-device-detect';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const useStyles = makeStyles((_) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    carousel: {
        borderRadius: '6px',
        margin: '1vh',
        padding: '1vh',
        backgroundColor: '#ecf0f1',
        boxShadow: '5px 6px 8px 3px rgba(0,0,0,0.75)'
    }
}))


export default function Tickets({ tickets }) {
    const classes = useStyles();

    const renderTickets = () => {
        if (isMobile) {
            return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} styleClasses={useStylesMobile} />)
        } else {
            return tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} styleClasses={useStylesDesktop} />)
        }
    }

    return (
        <>
            <div style={{ marginTop: '2vh' }} />
            <div className={classes.container}>
                {
                    tickets.length > 0 ?
                        <div data-testid='carousel-div'>
                            <CoustomTypography text="Tus Entradas" variant="h5" sx={{ fontWeight: 900, letterSpacing: 3,  }} />
                            <Carousel
                                className={classes.carousel}
                                autoPlay={false}
                                IndicatorIcon={<ConfirmationNumberIcon/>}
                                animation="slide"
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: '#2e86c1',
                                        borderRadius: 10,
                                        padding: '4px'
                                    }
                                }}
                            >
                                {renderTickets()}
                            </Carousel>
                        </div>
                        :
                        <CoustomTypography text='¡No tienes entradas reservadas disponibles!' variant="h5" />
                }
            </div>
        </>
    )
}

