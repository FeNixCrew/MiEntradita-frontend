import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridItem from '../layout/GridItem';
import CoustomTypography from "../CoustomTypography";
import teamService from '../../services/TeamService';
import { useEffect, useState } from 'react';
import BackdropInherit from '../feedback/Backdrop';
import TextField from '@mui/material/TextField';
import ControlledAutocomplete from '../layout/ControlledAutocomplete';
import { label } from '../../helpers/usedFunctions'

function CreateMatchForm({ onSubmit }) {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, today.getHours(), today.getMinutes());
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            date: (nextWeek.toJSON().split("T")[0]),
            time: '18:15',
            price: 500,
            home: '',
            away: '',
        }
    });
    const [teams, setTeams] = useState(null);

    register('time', { required: true });
    register('date', { required: true });
    register('price', { required: true, min: 500 });

    useEffect(() => {
        teamService.teams()
            .then((response) => setTeams(response.data))
            .catch((error) => console.log(error.response));
    }, []);

    const renderTeams = () => {
        return teams.map((team) => team.name)
    }

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const getError = (field, fieldName) => {
        return (errors[field] && errors[field].type === 'required' && `${fieldName} es obligatorio`)
    }

    return (
        <>
            <div style={{ paddingTop: '3vh' }} />
            {teams !== null ?
                <>
                    <CoustomTypography text="Nuevo partido" />
                    <Paper
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            backgroundColor: '#ecf0f1',
                            padding: '2vh',
                            borderRadius: 2,
                            marginBottom: '1vh'
                        }}
                        elevation={6}
                    >
                        <Grid container spacing={1} style={{ display: 'flex' }}>
                            <Grid item xs={12} >
                                <InputLabel style={{ paddingBottom: '1vh' }}>{label("Local")}</InputLabel>
                                <ControlledAutocomplete
                                    control={control}
                                    name="home"
                                    options={renderTeams()}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Seleccionar un equipo"
                                            error={showError('home')}
                                            helperText={getError('home', "Equipo local")}
                                        />
                                    }
                                    defaultValue={null}
                                    rules={{ required: true }}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel style={{ paddingBottom: 1 }}>{label("Visitante")}</InputLabel>
                                <ControlledAutocomplete
                                    control={control}
                                    name="away"
                                    options={renderTeams()}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Seleccionar un equipo"
                                            error={showError('away')}
                                            helperText={getError('away', "Equipo visitante")}
                                        />
                                    }
                                    defaultValue={null}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <GridItem
                                register={register}
                                showError={showError('date')}
                                helperText={getError('date', 'Fecha de partido')}
                                name="date"
                                type="date"
                                id="date-id"
                                givenLabel="Fecha de partido"
                                xs={12}
                            />

                            <GridItem
                                register={register}
                                showError={showError('time')}
                                helperText={getError('time', 'Hora de partido')}
                                name="time"
                                type="time"
                                id="time-id"
                                givenLabel="Hora de partido"
                                xs={12}
                            />
                            <GridItem
                                register={register}
                                showError={showError('price')}
                                helperText={getError('price', 'Precio') || (errors['price']?.type === 'min' && 'Las entradas no pueden valer menos de $500')}
                                name="price"
                                type="number"
                                id="price-id"
                                givenLabel="Precio de entrada"
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
                                <AddIcon style={{ marginRight: '1vw' }} /> {label("Crear partido")}
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