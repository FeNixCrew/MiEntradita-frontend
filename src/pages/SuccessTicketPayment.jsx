import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import spectatorService from "../services/SpectatorService";
import { Box } from "@mui/system";
import Check from '../assets/check-mark.png'
import { Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((_) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    checkContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    check: {
        width: '10vw',
        height: '10vw',
        marginTop: '13vh'
    },
    message1: {
        fontStyle: 'italic',
        marginTop: '4vh',
        fontFamily: 'Quicksand'
    },
    message2: {
        fontStyle: 'italic',
        marginBottom: '3vh',
        fontSize: 17,
        marginTop: '1vh',
        fontFamily: 'Quicksand'
    }
}))

function Success({ ticketId, payment_id }) {
    const [progress, setProgress] = useState(0);
    const history = useHistory()
    const classes = useStyle();

    useEffect(() => {
        spectatorService.savePayment(ticketId, payment_id);
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 20));

            if (progress === 100) {
                const username = localStorage.getItem('username')
                history.push(`/${username}/home`)
            }

        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, [ticketId, payment_id, progress, history]);

    return (
        <div>
            {
                ticketId && payment_id
                    ? <div className={classes.root}>
                        <Box sx={{ marginTop: '5vh' }}>
                            <Box className={classes.checkContainer}>
                                <img src={Check} alt="check mark" className={classes.check} />
                                <Typography component='h2' variant='h4' className={classes.message1}>¡Compra exitosa!</Typography>
                                <Typography className={classes.message2}>
                                    Te estamos redirigiendo al inicio... {progress / 2 * 0.1}
                                </Typography>
                                <CircularProgress variant="determinate" value={progress} color='success' sx={{ marginTop: '4vh' }} size={50} />
                            </Box>
                        </Box>
                    </div>
                    : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <CircularProgress />
                    </Box>
            }
        </div>
    )
}

function SuccessTicketPayment() {
    const history = useHistory();
    const { ticketId } = useParams();
    const queryParams = new URLSearchParams(history.location.search);
    const payment_id = queryParams.get('payment_id');

    return <Success ticketId={ticketId} payment_id={payment_id} />
}

export default SuccessTicketPayment;