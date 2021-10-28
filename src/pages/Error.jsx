import { Divider, Grid, Fab, Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'grid',
        justifyContent: 'center',
        marginTop: '20vh',
        backgroundColor: '#d7dbdd',
        ml: '5vh',
        mr: '5vh'
    },
    statusCode: {
        color: '#2e86c1',
        fontFamily: 'Quicksand',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '1vh'
    },
    errorMessage: {
        color: 'black',
        p: '1vh',
        fontFamily: 'Quicksand',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    divider:{
        borderColor: 'black'
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: '5vh'
    },
    icon: {
        color: 'black',
        "&:hover": { color: '#2e86c1' }
    }
}));

function Error({ statusCode, errorMessage }) {
    const classes = useStyle();
    const history = useHistory();

    return (
        <Grid className={classes.root}>
            <Typography variant='h1' className={classes.statusCode}>
                {statusCode}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant='h3' className={classes.errorMessage}>
                {errorMessage}
            </Typography>
            <Box className={classes.iconContainer}>
                <IconButton>
                    <Fab
                        style={{ backgroundColor: '#2e86c1', }}
                        className={classes.icon}
                        aria-label="login"
                        onClick={() => history.push('/')}
                    >
                        <HomeIcon />
                    </Fab>
                </IconButton>
            </Box>
        </Grid>
    );
}

export default Error;