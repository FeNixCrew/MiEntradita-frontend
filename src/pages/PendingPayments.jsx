import { useEffect } from "react";
import { useState } from "react";

import spectatorService from "../services/SpectatorService";
import { useSnackbar } from "../helpers/hooks/useSnackbar";
import TicketPaymentCard from "../components/TicketPaymentCard";
import SnackBar from "../components/feedback/SnackBar";
import BurgerMenu from "../components/navigation/BurgerMenu";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

import PayIcon from '../assets/pay_icon.png'
import { CircularProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


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
    const classes = useStyle();

    useEffect(() => {
        spectatorService.pendingPayments()
            .then((res) => {
                setPendingPayments(res.data);
            })
            .catch((_) => {
                setError('Fallo al obtener entradas para pagar. Intente de nuevo');
            })
    }, [setError]);

    const showPendingTicketsPayment = () => {
        return pendingPayments.map(ticket => <TicketPaymentCard key={ticket.id} ticket={ticket} />);
    }

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
                pendingPayments
                    ? <div>
                        <Box component={Paper} className={classes.banner}>
                            <img className={classes.bannerLogo} src={PayIcon} alt="pay icon" />
                        </Box>
                        <Container className={classes.container} >
                            <Grid container>
                                {showPendingTicketsPayment()}
                            </Grid>
                        </Container>
                    </div>
                    : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
            }
        </div>
    )
}

function PendingPayments() {
    return <BurgerMenu children={<PendingPaymentsPage />} />
}

export default PendingPayments;