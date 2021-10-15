import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatDateAndTime } from '../../helpers/usedFunctions';

export default function AvailableMatch({match, setMatch}) {
    return (
        <div >
        <Grid item md={12} style={{marginTop:'2vh'}}>
            <Card style={{ padding: 1, backgroundColor: '#373737'}}>
                <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                        {`${match.home} vs ${match.away}`}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" sx={{color: "#2e86c1"}}>
                      {formatDateAndTime(match.matchStartTime)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{color: '#2e86c1'}} onClick={() => setMatch(match)}>Seleccionar</Button>
                </CardActions>
            </Card>
        </Grid>
        </div>
    );
}