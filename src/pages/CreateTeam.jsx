import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Container, createTheme } from '@mui/material';

import BackdropInherit from '../components/feedback/Backdrop';

import { useToggle } from '../helpers/hooks/useToggle';
import SnackBar from '../components/feedback/SnackBar';
import { useState } from 'react';
import BurgerMenu from '../components/navigation/BurgerMenu';
import CreateTeamForm from '../components/forms/CreateTeamForm';
import teamService from '../services/TeamService';


function CreateTeamComponent() {
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [open, handleClose, handleToggle] = useToggle();
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();
    const theme = createTheme();

    const onSubmit = (data) => {
        handleToggle();
        teamService.create(data.name, data.knowName, data.stadium)
            .then(_ => {
                handleClose();
                setSeverity("success");
                setMessage("Equipo creado exitosamente");
                openSnackBar();
            })
            .catch(error => {
                const response = error.response;
                handleClose();
                setSeverity("error");
                setMessage(response.data.message);
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
                <CreateTeamForm onSubmit={onSubmit} />
            </Container >
        </ThemeProvider >
    )


}

export default function CreateTeam() { 
    return <BurgerMenu children={<CreateTeamComponent/>} />
}