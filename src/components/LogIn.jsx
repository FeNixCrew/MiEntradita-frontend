import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function LogIn() {
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const classes = useStyles();


    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen(!open);
    }


    const history = useHistory();

    const onSubmit = data => {
        // alert(JSON.stringify(data));
        handleToggle();
        setTimeout(() => {
            handleClose();
            if (data.username === "admin") localStorage.setItem('role', 'admin');
            else localStorage.setItem('role', 'user');

            console.log(data);

            history.push('/user/main');
        }, 4000)

    };

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ConfirmationNumber/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Bienvenido a MiEntradita
                    </Typography>

                    <Typography component="h1" variant="h6">
                        Iniciar Sesion
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            {...register("username")}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            {...register("password")}
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesion
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    );
}