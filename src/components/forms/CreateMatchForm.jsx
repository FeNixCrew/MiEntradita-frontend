import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridItem from '../GridItem';
import BeginningTypography from "../BeginningTypography";
import matchService from '../../services/MatchService';
import { useEffect, useState } from 'react';
import BackdropInherit from '../feedback/Backdrop';
import TextField from '@mui/material/TextField';
import ControlledAutocomplete from './ControlledAutocomplete';

function CreateMatchForm({ onSubmit }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            date: (new Date().toJSON().split("T")[0]),
            time: ('16:00'),
            price: 200,
            home: '',
            away: '',
            stadium: ''
        }
    });
    const [teams, setTeams] = useState(null);
    register('stadium', { required: true });

    useEffect(() => {
        matchService.teams()
            .then((response) => { setTeams([].concat(response.data)); console.log(response.data) })
            .catch((error) => console.log(error.response));
    }, []);

    const renderTeams = () => {
        return teams.map((team) => team.name)
    }

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const getError = (field, fieldName) => {
        return (errors[field] && errors[field].type === 'required' && `El campo ${fieldName} es requerido`)
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
                        style={{
                            backgroundColor: '#d7dbdd',
                            padding: '2vh',
                            borderRadius: 2,
                            marginBottom: '1vh'
                        }}
                        elevation={6}
                    >
                        <Grid container spacing={1} style={{ display: 'flex' }}>
                            <Grid item xs={12} >
                                <InputLabel style={{ paddingBottom: 1 }}>Local</InputLabel>
                                <ControlledAutocomplete
                                    control={control}
                                    name="home"
                                    options={renderTeams()}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Selecciona un equipo"
                                            error={showError('home')}
                                            helperText={getError('home', "local")}
                                        />
                                    }
                                    defaultValue={null}
                                    rules={{ required: true }}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel style={{ paddingBottom: 1 }}>Visitante</InputLabel>
                                <ControlledAutocomplete
                                    control={control}
                                    name="away"
                                    options={renderTeams()}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Selecciona un equipo"
                                            error={showError('away')}
                                            helperText={getError('away', "visitante")}
                                        />
                                    }
                                    defaultValue={null}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <GridItem
                                register={register}
                                showError={showError('stadium')}
                                helperText={getError('stadium', 'estadio')}
                                name="stadium"
                                id="stadium-id"
                                label="Estadio Local"
                                xs={12}
                            />
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
                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ marginTop: 3, marginBottom: 2, maxWidth: '50%', backgroundColor: '#2e86c1' }}
                            >
                                <AddIcon style={{ marginRight: '1vw' }} /> Crear partido
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