import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Paper, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridItem from '../layout/GridItem';
import CoustomTypography from "../CoustomTypography";
import teamService from '../../services/TeamService';
import { useEffect, useState } from 'react';
import BackdropInherit from '../feedback/Backdrop';
import TextField from '@mui/material/TextField';
import ControlledAutocomplete from '../layout/ControlledAutocomplete';
import { label } from '../../helpers/usedFunctions'
import { makeStyles } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';

const useStyle = makeStyles((_) => ({
    root: {
        paddingTop: '1vh'
    },
    formContainer: {
        backgroundColor: '#ecf0f1',
        padding: '2vh',
        borderRadius: 2,
        marginBottom: '1vh'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2vh'
    },
    button: {
        marginBottom: '1vh',
        maxWidth: '40%',
        color: 'black',
        backgroundColor: '#2e86c1',
        '&:hover': {
            backgroundColor: 'white'
        }
    }
}))


function CreateMatchForm({ onSubmit, isLoading }) {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, today.getHours(), today.getMinutes());
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            date: (nextWeek.toJSON().split("T")[0]),
            time: '18:15',
            price: 500,
            home: '',
            away: '',
            admittedPercentage: 50
        }
    });
    const [teams, setTeams] = useState(null);
    const classes = useStyle();

    register('time', { required: true });
    register('date', { required: true });
    register('price', { required: true, min: 500 });
    register('admittedPercentage', { required: true, min: 0, max: 100 });

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
            <div className={classes.root} />
            {teams !== null ?
                <>
                    <CoustomTypography text="Nuevo partido" sx={{ textAlign: 'center' }} />
                    <Paper
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className={classes.formContainer}
                        elevation={3}
                    >
                        <Grid container spacing={1} style={{}}>
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
                            <GridItem
                                register={register}
                                showError={showError('admittedPercentage')}
                                helperText={getError('admittedPercentage', 'Porcentaje de aforo') || ((errors['admittedPercentage']?.type === 'min' || errors['admittedPercentage']?.type === 'max') && 'El porcentaje debe estar entre 0 y 100')}
                                name="admittedPercentage"
                                type="number"
                                id="admittedPercentage-id"
                                givenLabel="Porcentaje de aforo"
                                xs={12}
                            />
                        </Grid>
                        <Box className={classes.buttonContainer}>
                            <LoadingButton
                                loading={isLoading}
                                startIcon={<AddIcon />}
                                loadingPosition="start"
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.button}
                            >
                                {label("Crear partido")}
                            </LoadingButton>
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