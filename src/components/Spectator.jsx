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
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();
    const [isLoading, handleClose, handleToggle] = useToggle();
    const [nextMatches, setNextMatches] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [teamId, setTeamId] = useState(null);
    const history = useHistory();
    const classes = useStyle();

    useEffect(() => {
        handleToggle();
        findPendingTickets()
            .then((_) => {
                 return spectatorService.nextMatches();
            })
            .then((response) => {
                setNextMatches(response.data);
                handleClose();
            })
            .catch((_) => {
                setError('Hubo un error al obtener los proximos partidos de tu equipo favorito, por favor, intente de nuevo.');
                handleClose();
            })
            ;
    }, [history, teamId]);

    const markAsFavourite = (newTeamId) => {
        if (newTeamId === teamId) {
            spectatorService.markAsFavourite(teamId);
            localStorage.favouriteTeamId = null;
            setTeamId(null);
        } else {
            localStorage.favouriteTeamId = newTeamId;
            setTeamId(newTeamId);
            spectatorService.markAsFavourite(newTeamId);
        }
    }
 
    const haveFavourite = () => {
        return teamId !== null;
    }

    const findPendingTickets = () => {
        return spectatorService.pendingTickets()
        .then(response => {
            setTickets(response.data);
            const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
            setTeamId(savedTeamId);
        })
        .catch((_) => {
            setError('Hubo un error al obtener sus entradas, por favor, intente de nuevo.');
        });    
    }

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
                tickets === null || isLoading || (teamId!==null && nextMatches ===null) ?
                    <BackdropInherit open={isLoading} />
                    :
                    <div>
                        <Tickets tickets={tickets} />
                        <span style={{ margin: '4vh' }} />
                        <Divider className={classes.divider} />
                        <Typography
                            className={classes.text}
                            variant="h5"
                        >
                            ¡Próximos encuentros de tu equipo favorito!
                        </Typography>
                        <NextMatches 
                            markAsFavourite={markAsFavourite}
                            haveFavourite={haveFavourite}
                            setMatches={setNextMatches}
                            findTickets={findPendingTickets}
                            nextMatches={nextMatches}
                            teamId={teamId}
                        />
                    </div>

            }
        </Root>
    )
}

export default Spectator;