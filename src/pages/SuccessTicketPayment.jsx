import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
import spectatorService from "../services/SpectatorService";
import { Box } from "@mui/system";
import Check from '../assets/check-mark.png'
import { Typography } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import Logo from '../assets/logo1.png';
import SnackBar from '../components/feedback/SnackBar';
import { useSnackbar } from "../helpers/hooks/useSnackbar";

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
    },
    thanksContainer: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '18vh'
    },
    logoContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: '2vh'
    },
    logoMessage: {
        fontFamily: 'Quicksand', 
        marginLeft: '1vh'
    }
}))

function Success({ ticketId, payment_id }) {
    const [setError, _, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [progress, setProgress] = useState(100);
    const [isSaved, setIsSaved] = useState(false);
    const history = useHistory()
    const classes = useStyle();
    
    useEffect(() => {
        if(!isSaved) {
            spectatorService.savePayment(ticketId, payment_id)
                .then(_ => {
                    setIsSaved(true);
                })
                .catch(_ => {
                    setError('No pudimos guardar tu pago.');
                });
        }
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress === 0 ? 0 : prevProgress - 20));
            if (progress === 0) {
                const username = localStorage.getItem('username');
                history.push(`/${username}/home`);
            }
        }, 800);
    
        return () => {
            clearInterval(timer);
        };
    }, [ticketId, payment_id, progress, history, isSaved, setError]);

    return (
        <div>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            {
                ticketId && payment_id
                    ? <div className={classes.root}>
                        <Box>
                            <Box className={classes.checkContainer}>
                                <img src={Check} alt="check mark" className={classes.check} />
                                <Typography component='h2' variant='h4' className={classes.message1}>¡Compra registrada exitosamente!</Typography>
                                <Typography className={classes.message2}>
                                    Te redigiremos al inicio en... {progress / 2 * 0.1}
                                </Typography>
                                <CircularProgress variant="determinate" value={progress} color='success' sx={{ marginTop: '4vh' }} size={50} />
                                <Box className={classes.thanksContainer}>
                                    <Typography variant='h5' component='h2' style={{ fontFamily: 'Quicksand' }}>¡Gracias por elegirnos!</Typography>
                                    <Box className={classes.logoContainer}>
                                        <Avatar src={Logo} />
                                        <Typography variant='p' className={classes.logoMessage}>Mi Entradita©</Typography>
                                    </Box>
                                </Box>
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