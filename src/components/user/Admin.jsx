import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Box, Container } from '@mui/material';

import { theme } from './style';
import BackdropInherit from '../feedback/Backdrop';

import { useToggle } from '../../helpers/hooks/useToggle';
import * as Api from '../../helpers/ApiRest';
import SnackBar from '../feedback/SnackBar';
import { useState } from 'react';
import CreateMatchForm from '../admin/CreateMatchForm';

function Admin() {
    const [open, handleClose, handleToggle] = useToggle();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();

    const onSubmit = (data) => {
        let matchStartTime = new Date(data.date + "T" + data.time).toISOString();
        console.log(new Date(matchStartTime).toISOString());
        handleToggle();
        Api.createMatch(data.home, data.away, parseInt(data.price), matchStartTime)
            .then(response => {
                handleClose();
                setSeverity("success");
                setMessage("Partido creado exitosamente");
                openSnackBar();
            })
            .catch(error => {
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
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'rigth'
                    }}
                >
                    <CreateMatchForm onSubmit={onSubmit} />
                </Box>
            </Container >
        </ThemeProvider >
    );
}

export default Admin;
