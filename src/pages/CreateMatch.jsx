import { CssBaseline, Container } from '@mui/material';

import BackdropInherit from '../components/feedback/Backdrop';

import { useToggle } from '../helpers/hooks/useToggle';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import SnackBar from '../components/feedback/SnackBar';
import CreateMatchForm from '../components/forms/CreateMatchForm';
import matchService from '../services/MatchService';
import BurgerMenu from '../components/navigation/BurgerMenu';

function CreateMatchComponent() {
    const [open, handleClose, handleToggle] = useToggle();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    const onSubmit = (data) => {
        let matchStartTime = (data.date + "T" + data.time);
        handleToggle();
        matchService.create(data.home, data.away, parseInt(data.price), matchStartTime)
            .then(_ => {
                handleClose();
                setSuccess("Partido creado exitosamente");
            })
            .catch(error => {
                const response = error.response;
                handleClose();
                setError(response.data.message);
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