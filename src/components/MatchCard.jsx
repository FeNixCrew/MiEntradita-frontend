import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useToggle } from '../helpers/hooks/useToggle';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import MatchDetails from './details/MatchDetails';
import spectatorService from '../services/SpectatorService';
import SnackBar from './feedback/SnackBar';
import { makeStyles } from '@material-ui/core';
import TeamDetails from './details/TeamDetails';
import { label, formatDateAndTime } from '../helpers/usedFunctions';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '2vh',
        padding: '2vh',
    },
    reserved: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: 15
    },
    cardComp: {
        padding: '1vh',
        width: 'auto',
        height: 'auto',
        backgroundColor: '#ecf0f1',
        maxWidth: '70vw',
        minWidth: '40vw'
    },
    clickeable: {
        '&:hover': {
            color: '#2e86c1',
            cursor: 'pointer',
        },
        fontWeight: 500
    },
    data: {
        fontFamily: 'Quicksand',
        fontStyle: 'italic',
        paddingBottom: '1vh',
        fontSize: 15,
    },
    ticketsMessage: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: 15
    }
}))

function MatchCard({ match, teamId, markAsFavourite, haveFavouriteTeam }) {
    const [openMatchDetails, handleCloseMDetails, handleToggleMDetails] = useToggle();
    const [openTeamDetails, handleCloseTDetails, handleToggleTDetails] = useToggle();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    const [reserved, setReserved] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [amountSeverity, setAmountSeverity] = useState('');
    const [messageOfAmount, setMessageOfAmount] = useState('');

    const classes = useStyle();
    const matchTitle = `${match.home} vs ${match.away}`;
    const horarioFormateado = formatDateAndTime(match.matchStartTime);

    useEffect(() => {
            
        if (match.availableTickets === 0) {
            setAmountSeverity('red');
            setMessageOfAmount('¡Entradas agotadas!');
        } else if (( (match.capacitySupported * 10) / 100) > match.availableTickets) {
            setAmountSeverity('brown');
            setMessageOfAmount('¡Quedan pocas entradas!');
        } else if ((match.capacitySupported / 2) < match.availableTickets) {
            setAmountSeverity('green');
            setMessageOfAmount('¡Hay entradas!');
        }

        setReserved(match.isReserved);
        
    }, [match.isReserved, match.availableTickets, match.capacitySupported])

    const handleOpenTeamDetails = (team) => {
        setTeamName(team);
        handleToggleTDetails();
    }

    const titleElement = (teamName) => {
        return <div className={classes.clickeable} onClick={() => handleOpenTeamDetails(teamName)}>{teamName}</div>
    }

    const reserveTicket = (matchId) => {
        spectatorService.reserveTicket(matchId)
            .then((_) => {
                handleCloseMDetails();
                match.isReserved = true;
                setReserved(true);
                setSuccess("Entrada reservada");
            })
            .catch((error) => {
                const response = error.response;
                handleCloseMDetails();
                setError(response.data.message);
            })
    }

    return (
        <div data-testid='search-item'>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            {openMatchDetails && <MatchDetails open={openMatchDetails} handleClose={handleCloseMDetails} matchId={match.id} title={matchTitle} reserveTicket={reserveTicket} isAvailable={reserved} />}
            {openTeamDetails && <TeamDetails open={openTeamDetails} handleClose={handleCloseTDetails} teamName={teamName} teamId={teamId} markAsFavourite={markAsFavourite} haveFavouriteTeam={haveFavouriteTeam} />}
            <Grid item xs={12} className={classes.root}>
                <Card className={classes.cardComp}>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', maxWidth: '37vw', minWidth: '5vw'}}>
                            <Typography style={{ fontFamily: 'Quicksand', marginRight: '2vh' }} gutterBottom variant="h5" component="h2">
                                {titleElement(match.home)} vs {titleElement(match.away)}
                            </Typography>
                            <Typography
                                color={amountSeverity}
                                variant="outlined"
                                style={{ marginLeft: 'auto', }}
                                className={classes.ticketsMessage}
                            >
                                {messageOfAmount}
                            </Typography>
                        </div>
                        <Typography
                            className={classes.data}
                            gutterBottom
                            variant="div"
                            component="p"
                        >
                            {horarioFormateado}
                        </Typography>
                        {reserved && <Typography gutterBottom variant="div" component="p" className={classes.reserved}>
                            {label("Reservado")}
                        </Typography>}
                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ color: '#2e86c1' }} onClick={handleToggleMDetails}>Detalles de partido</Button>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
};

export default MatchCard;