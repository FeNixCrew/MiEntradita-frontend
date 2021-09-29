import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, CssBaseline, Box, Grid, InputLabel, Container, Fab } from '@mui/material';

import { theme } from './style'
import { equipos } from '../../equipos'
import BackdropInherit from '../feedback/Backdrop';
import { useToggle } from '../../helpers/hooks/useToggle';

const renderTeams = () => {
    return equipos.map((equipo, i) => <MenuItem key={i} value={equipo}>{equipo}</MenuItem>)
}

function Admin() {
    const [open, handleClose, handleToggle] = useToggle();
    const [home, setHome] = useState();
    const [away, setAway] = useState();
    const [matchStartTime, setMatchStartTime] = useState(new Date());
    const [price, setPrice] = useState(200);

    const handleChangeMatchStartTime = (event) => {
        setMatchStartTime(event.target.value)
    };

    const handleChangeHome = (event) => {
        setHome(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChangeAway = (event) => {
        setAway(event.target.value);
    };

    const handleSubmit = () => {
        
    }

    return (
        <ThemeProvider theme={theme} >
            <BackdropInherit open={open} />
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        my: 7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <InputLabel id="home-label">Local</InputLabel>
                                <TextField
                                    select
                                    labelId="home-label"
                                    id="home"
                                    fullWidth
                                    value={home}
                                    onChange={handleChangeHome}
                                >
                                    {renderTeams()}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel id="away-label">Visitante</InputLabel>
                                <TextField
                                    select
                                    labelId="away-label"
                                    id="away"
                                    fullWidth
                                    value={away}
                                    onChange={handleChangeAway}
                                >
                                    {renderTeams()}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel id="match-start-time">Fecha del partido</InputLabel>
                                <TextField
                                    fullWidth
                                    name="match-start-time"
                                    type="date"
                                    value={matchStartTime}
                                    id="match-start-time"
                                    onChange={handleChangeMatchStartTime}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel id="match-start-time">Hora del partido</InputLabel>
                                <TextField
                                    fullWidth
                                    name="match-start-time"
                                    type="time"
                                    value={matchStartTime}
                                    id="match-start-time"
                                    onChange={handleChangeMatchStartTime}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel id="price">Precio</InputLabel>
                                <TextField
                                    fullWidth
                                    name="price"
                                    value={price}
                                    onChange={handleChangePrice}
                                    type="number"
                                    id="price"
                                />
                            </Grid>
                        </Grid>
                        <Fab color="primary"  type="submit" aria-label="add" sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                           
                        }}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Box>
            </Container >
        </ThemeProvider >
    );
}

export default Admin;

