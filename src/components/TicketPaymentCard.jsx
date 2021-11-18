import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import { CardHeader } from '@mui/material';
import { Box } from '@mui/system';
import { formatDateAndTime } from '../helpers/usedFunctions';

const useStyle = makeStyles((_) => ({
    root: {
        marginTop: '1vh',
        padding: '2vh',
    },
    cardComp: {
        padding: '1vh',
        width: 'auto',
        height: 'auto',
        maxHeight: '20vw',
        backgroundColor: '#ecf0f1',
        maxWidth: '40vw',
        minHeight: '15vw',
        minWidth: '15vw'
    },
    data: {
        fontFamily: 'Quicksand',
        fontStyle: 'italic',
        paddingBottom: '1vh',
        fontSize: 15,
    },
    priceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: '1vh',
    }
}))

function TicketPaymentCard({ ticket }) {
    const classes = useStyle();

    const horarioFormateado = formatDateAndTime(ticket.matchStartTime)

    const payTicket = () => {
        window.open(ticket.link, '_self');
    }

    return (
        <div>
            {ticket
                ? <Grid item className={classes.root}>
                    <Card className={classes.cardComp}>
                        <CardHeader
                            title={<div style={{ fontSize: 21, textAlign: 'center' }}>{ticket.home} vs {ticket.away}</div>}
                            subheader={horarioFormateado}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                        />
                        <CardContent>
                            <Box className={classes.priceContainer}>
                                <Typography component="h2" variant="h3" color="text.primary">
                                    ${ticket.price}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth variant="contained" onClick={payTicket}>
                                Pagar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                : <Typography>Cargando</Typography>
            }
        </div>
    )
}

export default TicketPaymentCard;