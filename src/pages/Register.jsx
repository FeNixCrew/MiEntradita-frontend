import { useHistory } from 'react-router';
import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import RegisterForm from '../components/forms/register/RegisterForm';
import BeginningTypography from '../components/BeginningTypography';
import BeginningAvatar from '../components/BegginnigAvatar';
import BackdropInherit from '../components/feedback/Backdrop';
import { theme } from '../components/forms/register/styles.js'

import { useToggle } from '../helpers/hooks/useToggle';
import authService from '../services/AuthService';

function Register() {
    const [open, handleClose, handleToggle] = useToggle();
    const [error, setError] = useState(null);
    const history = useHistory();

    const onSubmit = data => {
        handleToggle();
        authService.register(data.name, data.surname, data.username, data.email, parseInt(data.dni), data.password)
            .then(response => {
                localStorage.setItem('spectatorId', response.data.id);
                localStorage.setItem('username', response.data.username);
                handleClose();
                history.push("/login");
            })
            .catch((aError) => {
                const response = aError.response;
                if (response.status);
                setError(response.data);
                handleClose();
            })
    };

    const resetError = () => setError('');

    return (
        <ThemeProvider theme={theme}>
            <BackdropInherit open={open} />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <BeginningAvatar />
                    <BeginningTypography text="Registrarse" />
                    <RegisterForm onSubmit={onSubmit} error={error} resetError={resetError} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;