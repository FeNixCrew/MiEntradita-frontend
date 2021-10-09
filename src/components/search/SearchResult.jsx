import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useToggle } from '../../helpers/hooks/useToggle';
import MatchDetails from '../MatchDetails';

function SearchResult({ match }) {
    const matchTitle = `${match.home} vs ${match.away}`;
    const [open, handleClose, handleToggle] = useToggle();

    return (
        <>
        <MatchDetails open={open} handleClose={handleClose} matchId={match.id} title={matchTitle} />
        <Grid item md={12} style={{marginTop:'2vh'}}>
            <Card style={{ padding: 1}}>
                <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                        {matchTitle}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{color: '#2e86c1'}} onClick={handleToggle}>Detalles de partido</Button>
                </CardActions>
            </Card>
        </Grid>
        </>
    );
};

export default SearchResult;