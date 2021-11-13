import { useState } from 'react';
import { useHistory } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import LoginForm from '../components/forms/LoginForm';
import BackdropInherit from '../components/feedback/Backdrop';
import CoustomAvatar from '../components/CoustomAvatar';

import authService from '../services/AuthService';
import spectatorService from '../services/SpectatorService'
import { saveData } from '../helpers/usedFunctions';
import Background from '../assets/background.png';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    loginImage: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    boxContainer: {
        marginTop: '10vh',
        marginBottom: '4vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

function LogIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const classes = useStyle();

    const getFavouriteTeam = () => {
        spectatorService.getFavouriteTeam()
            .then((response) => {
                localStorage.setItem('favouriteTeamId', null);
                if(response.data) {
                    localStorage.setItem('favouriteTeamId', response.data.id);
                }
            })
            .catch((error) => {
                const response = error.response;
                setError(response.data.message);
                setIsLoading(false);
            })
    }
    
    const onSubmit = data => {
        setIsLoading(true);
        authService.login(data.username, data.password)
            .then(response => {
                setIsLoading(false);
                saveData(response);
                push(response.data.role, response.data.username);
                return response.data.role
            })
            .then((role) => {
                if(role === 'ROLE_USER') {
                    getFavouriteTeam();
                }
            })
            .catch((aError) => {
                const response = aError.response;
                setError(response.data.message);
                setIsLoading(false);
            })
    };

    const resetError = () => setError('');

    const push = (role, username) => {
        switch (role) {
            case "ROLE_SCANNER":
                history.push('/scanner');
                break;
            default:
                history.push(`/${username}/home`);
                break;
        }
    }

    return (
        <>
            <BackdropInherit open={isLoading} />
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid
                    className={classes.loginImage}
                    item
                    xs={false}
                    sm={4}
                    md={7}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box className={classes.boxContainer}>
                        <CoustomAvatar />
                        <Typography
                            style={{
                                fontFamily: 'Quicksand',
                            }}
                            component='h2'
                            variant='h5'
                            data-testid='welcome'
                        >
                            ¡Bienvenido!
                        </Typography>
                        <LoginForm onSubmit={onSubmit} resetError={resetError} error={error} />

                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default LogIn;