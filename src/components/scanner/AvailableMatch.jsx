import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatDateAndTime } from '../../helpers/usedFunctions';


export default function AvailableMatch({ match, setMatch }) {
    return (
        <div>
            <Grid item md={12} sx={{ marginTop: '5vh' }}>
                <Card style={{ padding: 1, backgroundColor: '#ecf0f1' }}>
                    <CardContent style={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
                            {`${match.home} vs ${match.away}`}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div" sx={{ color: 'black', fontStyle: 'italic', fontSize: 19 }}>
                            {formatDateAndTime(match.matchStartTime)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" style={{ color: 'black' }} onClick={() => setMatch(match)}>Seleccionar</Button>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}