import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper,InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridItem from '../GridItem';
import BeginningTypography from "../BeginningTypography";
import matchService from '../../services/MatchService';
import { useEffect, useState } from 'react';
import BackdropInherit from '../feedback/Backdrop';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function CreateMatchForm({ onSubmit }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            date: (new Date().toJSON().split("T")[0]),
            time: ('16:00'),
            price: 200,
            home: '',
            away: ''
        }
    });
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        matchService.teams()
            .then((response) => { setTeams([].concat(response.data)); console.log(response.data) })
            .catch((error) => console.log(error.response));
    }, []);

    const renderTeams = () => {
        return teams.map((team) => team.name)
    }

    return (
        <>
            {teams !== null ?
                <>
                    <BeginningTypography text="Agregar partido" />
                    <Paper
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            backgroundColor: '#d7dbdd',
                            p: 2,
                            borderRadius: 2,
                            mb: 1
                        }}
                        elevation={6}
                    >
                        <Grid container spacing={1} sx={{ display: 'flex' }}>
                            <Grid item xs={12} >
                            <InputLabel sx={{ paddingBottom: 1}}>Local</InputLabel>
                                <Autocomplete
                                    freeSolo
                                    fullWidth
                                    options={renderTeams()}
                                    renderInput={(params) => <TextField {...params} label="Selecciona un equipo" />}
                                />
                            </Grid>
                            <Grid item xs={12} >
                            <InputLabel sx={{ paddingBottom: 1}}>Visitante</InputLabel>
                                <Autocomplete
                                    freeSolo
                                    fullWidth
                                    options={renderTeams()}
                                    renderInput={(params) => <TextField {...params} label="Selecciona un equipo" />}
                                />
                            </Grid>
                            <GridItem
                                register={register}
                                name="date"
                                type="date"
                                id="date-id"
                                label="Fecha de partido"
                                xs={12}
                            />

                            <GridItem
                                register={register}
                                name="time"
                                type="time"
                                id="time-id"
                                label="Hora de partido"
                                xs={12}
                            />
                            <GridItem
                                register={register}
                                name="price"
                                type="number"
                                id="price-id"
                                label="Precio"
                                xs={12}
                            />

                        </Grid>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, maxWidth: '50%' }}
                            >
                                <AddIcon sx={{ mr: 1 }} /> Crear partido
                            </Button>
                        </Box>
                    </Paper>
                </>
                :
                <BackdropInherit open={true} />
            }
        </>

    )
}

export default CreateMatchForm;