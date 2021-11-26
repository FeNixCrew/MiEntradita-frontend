import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useToggle } from '../helpers/hooks/useToggle';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import MatchDetails from './details/MatchDetails';
import spectatorService from '../services/SpectatorService';
import SnackBar from './feedback/SnackBar';
import { makeStyles } from '@material-ui/core';
import TeamDetails from './details/TeamDetails';
import { label, formatDateAndTime, isAdmin } from '../helpers/usedFunctions';
import { useHistory } from 'react-router-dom';
import { useStylesMobile, useStylesDesktop } from './details/styles';
import { isMobile } from 'react-device-detect';
import teamService from '../services/TeamService'
import { Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../style/style';


const useStyle = makeStyles((_) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between'
    },
    container: {
        marginTop: '2vh',
        padding: '2vh',
    },
    reserved: {
        color: 'grey',
        fontStyle: 'italic',
        fontSize: 15
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: '65vw',
        minWidth: '20vw'
    },
    cardComp: {
        padding: '1vh',
        width: 'auto',
        height: 'auto',
        backgroundColor: '#ecf0f1',
        maxWidth: '80vw',
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

function MatchCard({ match, teamId, markAsFavourite, haveFavouriteTeam, callbackToComponent = null }) {
    const [openMatchDetails, handleCloseMDetails, handleToggleMDetails] = useToggle();
    const [openTeamDetails, handleCloseTDetails, handleToggleTDetails] = useToggle();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    const [reserved, setReserved] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [amountSeverity, setAmountSeverity] = useState('');
    const [messageOfAmount, setMessageOfAmount] = useState('');
    const [ubication, setUbication] = useState({
        latitude: 0,
        longitude: 0
    })

    const classes = useStyle();
    const desktopClasses = useStylesDesktop();
    const mobileClasses = useStylesMobile();

    const matchTitle = `${match.home} vs ${match.away}`;
    const horarioFormateado = formatDateAndTime(match.matchStartTime);
    const history = useHistory();

    const pushToAttendanceData = () => {
        history.push("/admin/match/attendance", { match: match })
    }

    const setMatchStatus = useCallback(() => {
        const startMatchTime = new Date(match.matchStartTime);
        const endMatchTime = new Date(startMatchTime.getTime() + 90 * 60000);
        const now = new Date();

        if (now >= startMatchTime && now < endMatchTime) {
            setAmountSeverity('#2e7d32');
            setMessageOfAmount('¡Jugándose!');
        } else if (now < startMatchTime) {
            setAmountSeverity('#0288d1');
            setMessageOfAmount('¡Por jugarse!');
        } else {
            setAmountSeverity('#d32f2f');
            setMessageOfAmount('¡Terminado!');
        }
    }, [match.matchStartTime]);

    const setTicketsAvailability = useCallback(() => {
        if (match.availableTickets === 0) {
            setAmountSeverity('#d32f2f');
            setMessageOfAmount('¡Entradas agotadas!');
        } else if (match.availableTickets <= ((match.capacitySupported * 10) / 100)) {
            setAmountSeverity('#ED6C02');
            setMessageOfAmount('¡Quedan pocas entradas!');
        } else {
            setAmountSeverity('#2e7d32');
            setMessageOfAmount('¡Hay entradas!');
        }
        setReserved(match.isReserved);
    }, [match.availableTickets, match.capacitySupported, match.isReserved]);

    const getTeamUbication = useCallback((teamName) => {
        teamService.details(teamName)
            .then((response) => {
                setUbication({
                    latitude: response.data.stadiumLatitude,
                    longitude: response.data.stadiumLongitude
                })
            })
            .catch((_) => {
                setError('Hubo un problema al obtener la ubicacion del partido. Intente de nuevo.');
            });
    }, [setError])

    useEffect(() => {
        if (isAdmin()) {
            setMatchStatus();
        } else {
            setTicketsAvailability();
        }
        getTeamUbication(match.home);
    }, [setMatchStatus, setTicketsAvailability, getTeamUbication, match.home]);

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
                if (callbackToComponent) callbackToComponent();
            })
            .catch((error) => {
                const response = error.response;
                handleCloseMDetails();
                setError(response.data.message);
            })
    }

    return (
        <ThemeProvider theme={theme} >
            <div data-testid='search-item' className={classes.root}>
                <SnackBar
                    openSnackBar={isOpenSnack}
                    severityState={severity}
                    message={message}
                    closeSnackBar={closeSnackBar}
                    position={{ vertical: 'bottom', horizontal: 'left' }}
                />
                {openMatchDetails && <MatchDetails open={openMatchDetails} handleClose={handleCloseMDetails} matchId={match.id} title={matchTitle} reserveTicket={reserveTicket} isAvailable={reserved} styleClasses={isMobile ? mobileClasses : desktopClasses} ubication={ubication} />}
                {openTeamDetails && <TeamDetails open={openTeamDetails} handleClose={handleCloseTDetails} teamName={teamName} teamId={teamId} markAsFavourite={markAsFavourite} haveFavouriteTeam={haveFavouriteTeam} />}
                <Grid item xs={12} className={classes.container}>
                    <Card className={classes.cardComp}>
                        <CardContent>
                            <div className={classes.textContainer} >
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
                            <Stack spacing={2} direction="row">
                                <Button size="small" onClick={handleToggleMDetails}>Detalles de partido</Button>
                                {isAdmin() && <Button size="small" onClick={pushToAttendanceData}>Datos de asistencia</Button>}
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default MatchCard;