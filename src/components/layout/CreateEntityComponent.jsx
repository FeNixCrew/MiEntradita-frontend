import { CssBaseline, Container } from '@mui/material';

import BackdropInherit from '../feedback/Backdrop';

import { useToggle } from '../../helpers/hooks/useToggle';
import { useSnackbar } from '../../helpers/hooks/useSnackbar';
import SnackBar from '../feedback/SnackBar';

function CreateEntity({ Children, resultPromise, entityName }) {
    const [open, handleClose, handleToggle] = useToggle();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    const onSubmit = (data) => {
        handleToggle();
        resultPromise(data)
            .then(_ => {
                handleClose();
                setSuccess(`${entityName} creado exitosamente`);
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
                <Children onSubmit={onSubmit} />
            </Container >
        </>
    );
}

export default CreateEntity;