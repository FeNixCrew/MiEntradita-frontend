import { useHistory } from 'react-router';
import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import RegisterForm from '../components/forms/RegisterForm';
import CoustomTypography from '../components/CoustomTypography';
import CoustomAvatar from '../components/CoustomAvatar';
import BackdropInherit from '../components/feedback/Backdrop';

import { useToggle } from '../helpers/hooks/useToggle';
import { saveData } from '../helpers/usedFunctions';
import authService from '../services/AuthService';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles((_) => ({
    boxContainer: {
        marginTop: 0.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))


function Register() {
    const [open, handleClose, handleToggle] = useToggle();
    const [error, setError] = useState(null);
    const history = useHistory();
    const classes = useStyle();

    const onSubmit = data => {
        handleToggle();
        authService.register(data.name, data.surname, data.username, data.email, parseInt(data.dni), data.password)
            .then(_ => login(data.username, data.password))
            .catch((aError) => {
                const response = aError.response;
                if (response.status);
                setError(response.data);
                handleClose();
            });
    };

    const login = (username, password) => {
        authService.login(username, password)
            .then(response => {
                saveData(response);
                handleClose();
                history.push(`/${username}/home`);
            })
            .catch((aError) => {
                const response = aError.response;
                if (response.status);
                setError(response.data);
                handleClose();
            })
    }

    const resetError = () => setError('');

    return (
        <>
            <BackdropInherit open={open} />
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box className={classes.boxContainer}>
                    <CoustomAvatar />
                    <CoustomTypography text="Registrarse" />
                    <RegisterForm onSubmit={onSubmit} error={error} resetError={resetError} />
                </Box>
            </Container>
        </>
    );
}

export default Register;