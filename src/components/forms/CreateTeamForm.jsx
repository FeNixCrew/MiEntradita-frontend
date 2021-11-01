import GridItem from "../layout/GridItem";
import { Box, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CoustomTypography from "../CoustomTypography";
import { label } from '../../helpers/usedFunctions'
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: '3vh'
    },
    container: {
        backgroundColor: '#ecf0f1',
        padding: '2vh',
        borderRadius: 2,
        marginBottom: '1vh'
    },
    formContainer: {
        display: 'flex'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '2vh'
    },
    button: {
        marginTop: 3,
        marginBottom: 2,
        color: 'black',
        maxWidth: '40%',
        backgroundColor: '#2e86c1',
        '&:hover': {
            backgroundColor: 'white'
        }
    }
}))

function CreateTeamForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            knowName: '',
            stadium: '',
            stadiumCapacity: 20000
        }
    });

    register('name', { required: true });
    register('knowName', { required: true });
    register('stadium', { required: true });
    register('stadiumCapacity', { required: true });

    const classes = useStyle();

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const getError = (field, fieldName) => {
        return (errors[field] && errors[field].type === 'required' && `${fieldName} es obligatorio`)
    }

    return (
        <>
            <div className={classes.root} />
            <CoustomTypography text={label("Nuevo Equipo")} sx={{ textAlign: 'center' }} />
            <Paper
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className={classes.container}
                elevation={3}
            >
                <Grid container spacing={1} className={classes.formContainer}>
                    <GridItem
                        register={register}
                        showError={showError('name')}
                        helperText={getError('name', 'Nombre de equipo')}
                        name="name"
                        type="text"
                        id="name-id"
                        givenLabel="Nombre de equipo"
                        xs={12}
                    />
                    <GridItem
                        register={register}
                        showError={showError('knowName')}
                        helperText={getError('knowName', 'Nombre conocido')}
                        name="knowName"
                        type="text"
                        id="knowName-id"
                        givenLabel="Nombre conocido"
                        xs={12}
                    />
                    <GridItem
                        register={register}
                        showError={showError('stadium')}
                        helperText={getError('stadium', 'Estadio')}
                        name="stadium"
                        type="text"
                        id="stadium-id"
                        givenLabel="Estadio"
                        xs={12}
                    />
                     <GridItem
                        register={register}
                        showError={showError('stadiumCapacity')}
                        helperText={getError('stadiumCapacity', 'Capacidad de Estadio')}
                        name="stadiumCapacity"
                        type="number"
                        id="stadiumCapacity-id"
                        givenLabel="Capacidad de Estadio"
                        xs={12}
                    />
                </Grid>
                <Box className={classes.buttonContainer}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.button}
                    >
                        <AddModeratorIcon style={{ marginRight: '1vw' }} /> {label("Crear equipo")}
                    </Button>
                </Box>
            </Paper>
        </>
    )
}

export default CreateTeamForm;