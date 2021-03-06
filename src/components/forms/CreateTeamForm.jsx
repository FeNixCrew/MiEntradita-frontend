import GridItem from "../layout/GridItem";
import { Box, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CoustomTypography from "../CoustomTypography";
import { label } from '../../helpers/usedFunctions'
import { makeStyles } from "@material-ui/core";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomIcon from '@mui/icons-material/Room';
import ShieldIcon from '@mui/icons-material/Shield';
import { useToggle } from "../../helpers/hooks/useToggle";
import LoadingButton from '@mui/lab/LoadingButton';


const useStyle = makeStyles((_) => ({
    root: {
        paddingTop: '5vh'
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
    accordionTitle: {
        fontFamily: 'Quicksand',
        fontSize: 17,
        fontWeight: 550
    },
    button: {
        marginTop: 3,
        marginBottom: 2,
        color: 'white',
        maxWidth: '40%',
        backgroundColor: '#2e86c1',
        '&:hover': {
            backgroundColor: '#21568a',
            cursor: 'pointer'
        }
    }
}))

function CreateTeamForm({ onSubmit, isLoading }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            knowName: '',
            stadiumName: '',
            stadiumCapacity: 20000,
            stadiumLatitude: -34.6037389,
            stadiumLongitude: -58.3815704,

        }
    });

    const [expandedPanel1, closePanel1, handleChangePanel1] = useToggle()
    const [expandedPanel2, closePanel2, handleChangePanel2] = useToggle()

    const handleChange = (panel) => (_, __) => {
        if (panel === 'panel1') {
            closePanel2();
            handleChangePanel1()
        } else {
            closePanel1()
            handleChangePanel2()
        }
    };

    register('name', { required: true });
    register('knowName', { required: true });
    register('stadiumName', { required: true });
    register('stadiumCapacity', { required: true, min: 1 });
    register('stadiumLongitude', { required: true });
    register('stadiumLatitude', { required: true });

    const classes = useStyle();

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const errorsPanel1 = [errors.name, errors.knowName];
    const errorsPanel2 = [errors.stadiumName, errors.stadiumCapacity, errors.stadiumLatitude, errors.stadiumLongitude];

    const errorsPanel = (array, change) => {
        // eslint-disable-next-line array-callback-return
        return array.some((field) => {
            if (field !== undefined) {
                change();
                return field
            }
        })
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
                <Accordion sx={{ padding: '1vh' }} expanded={expandedPanel1 || errorsPanel(errorsPanel1, handleChangePanel1)} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <ShieldIcon /> <Typography classes={{ root: classes.accordionTitle }}>  Editar informaci??n de equipo</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ padding: '1vh' }} expanded={expandedPanel2 || errorsPanel(errorsPanel2, handleChangePanel2)} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <RoomIcon /> <Typography classes={{ root: classes.accordionTitle }}> Editar informaci??n de estadio</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GridItem
                            register={register}
                            showError={showError('stadiumName')}
                            helperText={getError('stadiumName', 'Nombre')}
                            name="stadiumName"
                            type="text"
                            id="stadiumName-id"
                            givenLabel="Nombre"
                            xs={12}
                        />
                        <GridItem
                            register={register}
                            showError={showError('stadiumCapacity')}
                            helperText={getError('stadiumCapacity', 'Capacidad') || (errors['stadiumCapacity']?.type === 'min' && 'La capacidad del estadio no puede ser 0')}
                            name="stadiumCapacity"
                            type="number"
                            id="stadiumCapacity-id"
                            givenLabel="Capacidad"
                            xs={12}
                        />
                        <GridItem
                            register={register}
                            showError={showError('stadiumLatitude')}
                            helperText={getError('stadiumLatitude', 'Latitud')}
                            name="stadiumLatitude"
                            type="number"
                            id="stadiumLatitude-id"
                            givenLabel="Latitud"
                            xs={12}
                        />
                        <GridItem
                            register={register}
                            showError={showError('stadiumLongitude')}
                            helperText={getError('stadiumLongitude', 'Longitud')}
                            name="stadiumLongitude"
                            type="number"
                            id="stadiumLongitude-id"
                            givenLabel="Longitud"
                            xs={12}
                        />
                    </AccordionDetails>
                </Accordion>
                <Box className={classes.buttonContainer}>
                    <LoadingButton
                        loading={isLoading}
                        type="submit"
                        startIcon={<AddModeratorIcon />}
                        loadingPosition="start"
                        fullWidth
                        variant="contained"
                        className={classes.button}
                    >
                        {label("Crear equipo")}
                    </LoadingButton>
                </Box>
            </Paper>
        </>
    )
}

export default CreateTeamForm;