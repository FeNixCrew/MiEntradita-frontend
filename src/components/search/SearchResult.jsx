import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function SearchResult({ match }) {
    const matchTitle = `${match.home} vs ${match.away}`;
    const matchTime = match.matchStartTime.split('T')[0].replaceAll('-', '/').concat(' ', match.matchStartTime.split('T')[1])

    return (
        <Grid item md={12} sx={{m:5}}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                        {matchTitle}
                    </Typography>
                    <Typography variant="h7">
                        {matchTime}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Quiero mi ticket</Button> */}
                    <Button size="small">Detalles de partido</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default SearchResult;