import { CssBaseline, Container } from '@mui/material';

import BackdropInherit from '../components/feedback/Backdrop';

import { useToggle } from '../helpers/hooks/useToggle';
import SnackBar from '../components/feedback/SnackBar';
import { useState } from 'react';
import CreateMatchForm from '../components/forms/CreateMatchForm';
import matchService from '../services/MatchService';
import BurgerMenu from '../components/navigation/BurgerMenu';

function CreateMatchComponent() {
    const [open, handleClose, handleToggle] = useToggle();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();

    const onSubmit = (data) => {
        let matchStartTime = (data.date + "T" + data.time);
        handleToggle();
        matchService.create(data.home, data.away, parseInt(data.price), matchStartTime)
            .then(_ => {
                handleClose();
                setSeverity("success");
                setMessage("Partido creado exitosamente");
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
        <>
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
        </>
    );
}

export default function CreateMatch() {
    return <BurgerMenu children={<CreateMatchComponent />} />
}