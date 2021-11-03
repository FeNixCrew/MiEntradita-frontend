import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Tickets from './ticket/TicketsCarousel';
import BackdropInherit from './feedback/Backdrop';
import spectatorService from '../services/SpectatorService';
import SnackBar from '../components/feedback/SnackBar';
import { useToggle } from '../helpers/hooks/useToggle';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import NextMatches from './NextMatches';
import { makeStyles, Typography } from '@material-ui/core';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(1),
    },
}));

const useStyle = makeStyles((theme) => ({
    divider: {
        marginTop: '4vh'
    },
    text: {
        fontFamily: 'Quicksand',
        textAlign: 'center',
        fontWeight: 'bolder',
        letterSpacing: 3
    }
}))

function Spectator() {
    const [tickets, setTickets] = useState(null);
    const history = useHistory();
    const [isLoading, handleClose, handleToggle] = useToggle();
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();
    const classes = useStyle();

    useEffect(() => {
        handleToggle();
        spectatorService.pendingTickets()
            .then(response => {
                setTickets(response.data);
            })
            .catch((_) => {
                setError('Hubo un error al obtener sus entradas, por favor, intente de nuevo.');
            });
    }, [history]);

    return (
        <Root>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            {
                tickets === null ?
                    <BackdropInherit open={isLoading} />
                    :
                    <Tickets tickets={tickets} />

            }
            <span style={{ margin: '4vh' }} />
            <Divider className={classes.divider} />
            <Typography
                className={classes.text}
                variant="h5"
            >
                ¡Partidos que quizas te interesen!
            </Typography>
            <NextMatches closeBackdrop={handleClose} />
        </Root>
    )
}

export default Spectator;