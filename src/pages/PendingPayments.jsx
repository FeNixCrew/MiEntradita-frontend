import { useEffect } from "react";
import { useState } from "react";

import spectatorService from "../services/SpectatorService";
import { useSnackbar } from "../helpers/hooks/useSnackbar";
import TicketPaymentCard from "../components/TicketPaymentCard";
import SnackBar from "../components/feedback/SnackBar";
import BurgerMenu from "../components/navigation/BurgerMenu";
import PayIcon from '../assets/pay_icon.png'
import BackdropInherit from '../components/feedback/Backdrop'

import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useToggle } from "../helpers/hooks/useToggle";


const useStyle = makeStyles((_) => ({
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '7vh',
        backgroundColor: '#2e86c1',
        padding: '3vh',
        marginLeft: '10vh',
        marginRight: '10vh',
        marginTop: '3vh'
    },
    bannerLogo: {
        width: '8vw',
        height: '8vw'
    },
    container: {
        marginTop: '3vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))


function PendingPaymentsPage() {
    const [setError, _, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [pendingPayments, setPendingPayments] = useState(null);
    const [open, handleClose, handleToggle] = useToggle();
    const classes = useStyle();

    useEffect(() => {
        handleToggle();
        spectatorService.pendingPayments()
            .then((res) => {
                setPendingPayments(res.data);
                handleClose();
            })
            .catch((_) => {
                handleClose();
                setError('Fallo al obtener entradas para pagar. Intente de nuevo');
            })
    }, [setError, handleToggle, handleClose]);

    const showPendingTicketsPayment = () => {
        return pendingPayments.map(ticket => <TicketPaymentCard key={ticket.id} ticket={ticket} />);
    }

    return (
        <div>
            <BackdropInherit  open={open}/>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <Box component={Paper} className={classes.banner}>
                <img className={classes.bannerLogo} src={PayIcon} alt="pay icon" />
            </Box>
            {
                pendingPayments && !(pendingPayments.length === 0)
                    ? <Container className={classes.container} >
                        <Grid container>
                            {showPendingTicketsPayment()}
                        </Grid>
                    </Container>
                    : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
                        <Typography variant='h5' component='div' style={{ fontFamily: 'Quicksand', fontStyle: 'italic' }} >¡No tienes entradas para pagar aun!</Typography>
                    </Box>
            }
        </div>
    )
}

function PendingPayments() {
    return <BurgerMenu children={<PendingPaymentsPage />} />
}

export default PendingPayments;