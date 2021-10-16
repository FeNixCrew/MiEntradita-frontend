import { useState } from 'react';
import { useHistory } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import LoginForm from '../components/forms/login/LoginForm';
import BackdropInherit from '../components/feedback/Backdrop';
import BeginningAvatar from '../components/BegginnigAvatar';

import authService from '../services/AuthService';
import { saveData } from '../helpers/usedFunctions';
import Background from '../assets/background.png';

function LogIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const onSubmit = data => {
        setIsLoading(true);
        authService.login(data.username, data.password)
            .then(response => {
                setIsLoading(false);
                saveData(response);
                push(response.data.role, response.data.username);
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
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 7,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <BeginningAvatar />
                        <Typography
                            component='h1'
                            variant='h6'
                            style={{
                                fontStyle: 'bold',
                                fontFamily: 'Monospace',
                            }}
                            data-testid='welcome'
                        >
                            Bienvenido!
                        </Typography>
                        <LoginForm onSubmit={onSubmit} resetError={resetError} error={error} />

                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default LogIn;