import { CssBaseline, Container, Box } from '@mui/material';

import { useToggle } from '../../helpers/hooks/useToggle';
import { useSnackbar } from '../../helpers/hooks/useSnackbar';
import SnackBar from '../feedback/SnackBar';
import BurgerMenu from '../navigation/BurgerMenu'

function AbstractAdminFormComponent({ Children, promise, entityName }) {
    const [open, handleClose, handleToggle] = useToggle();
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    const onSubmit = (data) => {
        handleToggle();
        promise(data)
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '90vh',
                }}
            >
                <SnackBar
                    openSnackBar={isOpenSnack}
                    closeSnackBar={closeSnackBar}
                    message={message}
                    severityState={severity}
                    position={{ vertical: 'bottom', horizontal: 'left' }}
                />
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Children onSubmit={onSubmit} isLoading={open} />
                </Container >
            </Box>
        </>
    );
}

export default function AbstractAdminForm({ Children, promise, entityName }) {
    return <BurgerMenu children={<AbstractAdminFormComponent Children={Children} promise={promise} entityName={entityName} />} />
}