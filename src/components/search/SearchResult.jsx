import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useToggle } from '../../helpers/hooks/useToggle';
import MatchDetails from '../details/MatchDetails';
import spectatorService from '../../services/SpectatorService';
import SnackBar from '../feedback/SnackBar';
import { makeStyles } from '@material-ui/core';
import TeamDetails from '../details/TeamDetails';
import { label, formatDateAndTime } from '../../helpers/usedFunctions'

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '2vh',
        padding: '2vh'
    },
    reserved: {
        color: 'grey',
        fontStyle: 'italic'
    },
    clickeable: {
        '&:hover': {
            color: '#2e86c1',
            cursor: 'pointer',
        },
        fontFamily: 'Quicksand'
    },
}))

function SearchResult({ match }) {
    const [openMatchDetails, handleCloseMDetails, handleToggleMDetails] = useToggle();
    const [openTeamDetails, handleCloseTDetails, handleToggleTDetails] = useToggle();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [severity, setSeverity] = useState(null);
    const [message, setMessage] = useState(null);
    const [reserved, setReserved] = useState(match.isReserved);
    const classes = useStyle();
    const [team, setTeam] = useState('');
    const matchTitle = `${match.home} vs ${match.away}`;
    const horarioFormateado = formatDateAndTime(match.matchStartTime);


    useEffect(() => {
        setReserved(match.isReserved);
    }, [match.isReserved])

    const handleOpenTeamDetails = (team) => {
        setTeam(team);
        handleToggleTDetails();
    }

    const titleElement = (teamName) => {
        return <span className={classes.clickeable} onClick={() => handleOpenTeamDetails(teamName)}>{teamName}</span>
    }

    const reserveTicket = (matchId) => {
        spectatorService.reserveTicket(matchId)
            .then((_) => {
                handleCloseMDetails();
                match.isReserved = true;
                setReserved(true);
                setSeverity("success");
                setMessage("Entrada reservada");
                openSnackBar();
            })
            .catch((error) => {
                const response = error.response;
                handleCloseMDetails();
                setSeverity("error");
                setMessage(response.data.message);
                openSnackBar();
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
            {openTeamDetails && <TeamDetails open={openTeamDetails} handleClose={handleCloseTDetails} teamName={team} />}
            <Grid item xs={12} className={classes.root}>
                <Card style={{ padding: 1, width: 'auto', height: 'auto', backgroundColor: '#ecf0f1', maxWidth: '36vw' }}>
                    <CardContent style={{ flexGrow: 1 }}>
                        <Typography style={{ fontFamily: 'Quicksand' }} gutterBottom variant="h5" component="h2">
                            {titleElement(match.home)} vs {titleElement(match.away)}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: 'Quicksand',
                                fontStyle: 'italic',
                                paddingBottom: '1vh'
                            }}
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
                        <Button size="small" onClick={handleToggleMDetails}>{label("Detalles de partido")}</Button>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
};

export default SearchResult;