import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Background from '../assets/background.png'
import * as Api from '../helpers/ApiRest.js'

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
    const [error, setError] = useState(null)
    const classes = useStyles();
    const history = useHistory();

    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen(!open);
    }

    const onSubmit = data => {
        handleToggle();
        Api.login(data.username, data.password)
            .then(response => {
                localStorage.setItem('spectatorId', response.data.id)
                localStorage.setItem('username', response.data.username)
                handleMe();
            })
            .catch((aError) => {
                const response = aError.response
                if(response.status)
                setError(response.data.message)
                handleClose()
            })
    };

    const handleMe = () => {
        const username = localStorage.getItem('username')
        Api.me()
            .then(response => {
                if (response.status === 200) {
                    let location = {
                        pathname: `/user/${username}`,
                        state: { userData: response.data }
                    }
                    history.push(location)
                }
                handleClose();
            })
            .catch(() => console.log("Error"))
    }

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
                        <Avatar sx={{ m: 1, bgcolor: '#229954' }}>
                            <ConfirmationNumber />
                        </Avatar>
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
                            { error && <p>{error}</p>}
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
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}