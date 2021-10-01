import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Container } from '@mui/material';

import { theme } from './style';
import BackdropInherit from '../feedback/Backdrop';

import { useToggle } from '../../helpers/hooks/useToggle';
import SnackBar from '../feedback/SnackBar';
import { useState } from 'react';
import CreateMatchForm from '../admin/CreateMatchForm';
import matchService from '../../services/MatchService';

function Admin() {
    const [open, handleClose, handleToggle] = useToggle();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();

    const onSubmit = (data) => {
        let matchStartTime = new Date(data.date + "T" + data.time)
        handleToggle();
        matchService.create(data.home, data.away, parseInt(data.price), matchStartTime)
            .then(_ => {
                handleClose();
                setSeverity("success");
                setMessage("Partido creado exitosamente");
                openSnackBar();
            })
            .catch(_ => {
                handleClose();
                setSeverity("error");
                setMessage("Partido no creado, ha ocurrido un error");
                openSnackBar();
            })

    }

    return (
        <ThemeProvider theme={theme} >
            <BackdropInherit open={open} />
            <SnackBar
                openSnackBar={isOpenSnack}
                closeSnackBar={closeSnackBar}
                message={message}
                severityState={severity}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <CreateMatchForm onSubmit={onSubmit} />
            </Container >
        </ThemeProvider >
    );
}

export default Admin;
