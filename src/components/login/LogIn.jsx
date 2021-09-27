import { useState } from 'react';
import { useHistory } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Background from '../../assets/background.png';
import { theme } from './styles';
import LoginForm from './LoginForm'
import BackdropInherit, { useBackdrop } from '../Feedback/Backdrop';
import * as Api from '../../helpers/ApiRest.js';
import BeginningTypography from '../Beginning/BeginningTypography';
import BeginningAvatar from '../Beginning/BegginnigAvatar';

function LogIn() {
    const { open, handleClose, handleToggle } = useBackdrop();
    const [error, setError] = useState(null);
    const history = useHistory()

    const onSubmit = data => {
        handleToggle();
        Api.login(data.username, data.password)
            .then(response => {
                localStorage.setItem('spectatorId', response.data.id);
                localStorage.setItem('username', response.data.username);
                handleClose();
                push(response.data.username);
            })
            .catch((aError) => {
                const response = aError.response;
                if (response.status);
                setError(response.data);
                handleClose();
            })
    };

    const resetError = () => setError('');

    const push = (username) => {
        if (username === "scanner") {
            history.push(`/${username}`);
        } else {
            history.push(`/user/${username}`);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <BackdropInherit open={open} />
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
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <BeginningAvatar />
                        <BeginningTypography text="Bienvenido!" />
                        <LoginForm onSubmit={onSubmit} resetError={resetError} error={error} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LogIn;