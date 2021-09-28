import { useHistory } from 'react-router';
import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import RegisterForm from '../components/register/RegisterForm';
import BeginningTypography from '../components/beginning/BeginningTypography';
import BeginningAvatar from '../components/beginning/BegginnigAvatar';
import BackdropInherit from '../components/feedback/Backdrop';
import { theme } from '../components/register/styles.js'

import { useToggle } from '../helpers/hooks/useToggle'
import * as Api from '../helpers/ApiRest.js';

function Register() {
    const [open, handleClose, handleToggle] = useToggle();
    const [error, setError] = useState(null);
    const history = useHistory();

    const onSubmit = data => {
        handleToggle();
        Api.register(data.name, data.surname, data.username, data.email, data.dni, data.password)
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
                        marginTop: 8,
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