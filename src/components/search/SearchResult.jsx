import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useToggle } from '../../helpers/hooks/useToggle';
import MatchDetails from '../MatchDetails';
import spectatorService from '../../services/SpectatorService';
import SnackBar from '../feedback/SnackBar';


function SearchResult({ match }) {
    const matchTitle = `${match.home} vs ${match.away}`;
    const [open, handleClose, handleToggle] = useToggle();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [severity, setSeverity] = useState(null);
    const [message, setMessage] = useState(null);
    const [reserved, setReserved] = useState(false);

    useEffect(() => {
        spectatorService.pendingTickets()
        .then((response) => {
            return response.data.some((ticket) => ticket.matchId === match.id)
          }).then((isAvailable) => {
            setReserved(isAvailable);
          })
    })

    const reserveTicket = (matchId) => {
        spectatorService.reserveTicket(matchId)
            .then((_) => {
                handleClose();
                setReserved(true);
                setSeverity("success");
                setMessage("Entrada reservada");
                openSnackBar();
            })
            .catch((error) => {
                const response = error.response;
                handleClose();
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
            {open && <MatchDetails open={open} handleClose={handleClose} matchId={match.id} title={matchTitle} reserveTicket={reserveTicket}/>}
            <Grid item md={12} style={{ marginTop: '2vh', padding: '2vh' }}>
                <Card style={{ padding: 1 }}>
                    <CardContent style={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {matchTitle}
                        </Typography>
                        {reserved && <Typography gutterBottom variant="div" component="p" style={{ color: 'grey', fontStyle: 'italic' }}>
                            Reservado
                        </Typography> }
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={handleToggle}>Detalles de partido</Button>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
};

export default SearchResult;