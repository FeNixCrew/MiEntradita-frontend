import { useHistory } from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import BackdropInherit, { useBackdrop } from '../Feedback/Backdrop';
import * as Api from '../../helpers/ApiRest.js';
import RegisterForm from './RegisterForm';
import Container from '@mui/material/Container';
import BeginningTypography from '../Beginning/BeginningTypography';
import BeginningAvatar from '../Beginning/BegginnigAvatar';
import { theme } from './styles.js'

function Register() {
    const { open, handleClose, handleToggle } = useBackdrop();
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
                console.log(aError);
                handleClose();
            })
    };

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
                    <RegisterForm onSubmit={onSubmit} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;