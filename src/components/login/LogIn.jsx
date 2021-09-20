import { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';

import Background from '../../assets/background.png';
import * as Api from '../../helpers/ApiRest.js';
import {theme, useStyles} from './styles';

export default function LogIn() {
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    const username = register('username');
    const password = register('password');

    const handleClose = () => {
        setOpen(false);
    }

    const handleToggle = () => {
        setOpen(!open);
    }

    const onSubmit = data => {
        handleToggle();
        Api.login(data.username, data.password)
            .then(response => {
                localStorage.setItem('spectatorId', response.data.id);
                localStorage.setItem('username', response.data.username);
                handleClose();
                history.push('/me');
        
            })
            .catch((aError) => {
                const response = aError.response;
                if(response.status);
                setError(response.data);
                handleClose();
            })
    };

    const resetError = () => setError('');

    return (
        <ThemeProvider theme={theme}>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#40C137' }}>
                            <ConfirmationNumber />
                        </Avatar>
                        <Typography 
                        component="h1" 
                        variant="h6"
                        sx={{
                            fontStyle: 'bold',
                            fontFamily: 'Monospace'
                        }}>
                            Bienvenidx!
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                {...register("username")}
                                margin="normal"
                                fullWidth
                                label="Usuario"
                                type="text"
                                autoFocus
                                onChange={(e) => {
                                    username.onChange(e);
                                    resetError();
                                }}
                            />
                            <TextField
                                {...register("password")}
                                margin="normal"
                                fullWidth
                                label="Contraseña"
                                type="password"
                                onChange={(e) => {
                                    password.onChange(e);
                                    resetError();
                                }}
                            />
                            <div className={classes.error}>
                            {error && <Alert severity="error">{error.message}</Alert>}
                            </div>
                            <Button
                                className={classes.loginButton}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ingresar
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}