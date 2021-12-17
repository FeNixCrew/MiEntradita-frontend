import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Paper, InputLabel, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
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
import { useToggle } from '../../helpers/hooks/useToggle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShieldIcon from '@mui/icons-material/Shield';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';

const useStyle = makeStyles((_) => ({
    root: {
        paddingTop: '5vh',
    },
    accordionRoot: {
        padding: '1.2vh'
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
    accordionTitle: {
        fontFamily: 'Quicksand',
        fontSize: 17,
        fontWeight: 550,
        marginBottom: '1px'
    },
    button: {
        marginBottom: '1vh',
        maxWidth: '40%',
        color: 'white',
        backgroundColor: '#2e86c1',
        '&:hover': {
            backgroundColor: '#21568a',
            cursor: 'pointer'
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

    const [expandedPanel1, closePanel1, handleChangePanel1] = useToggle();
    const [expandedPanel2, closePanel2, handleChangePanel2] = useToggle();
    const [expandedPanel3, closePanel3, handleChangePanel3] = useToggle();

    const handleChange = (panel) => (_, __) => {
        switch (panel) {
            case 'panel1':
                closePanel2();
                closePanel3();
                handleChangePanel1();
                break;
            case 'panel2':
                closePanel1();
                closePanel3();
                handleChangePanel2();
                break;
            default:
                closePanel1();
                closePanel2();
                handleChangePanel3();
                break;
        }
    };

    const errorsPanel = (array, change) => {
        // eslint-disable-next-line array-callback-return
        return array.some((field) => {
            if (field !== undefined) {
                change();
                return field
            }
        })
    }

    const errorsPanel1 = [errors.home, errors.away];
    const errorsPanel2 = [errors.date, errors.time];
    const errorsPanel3 = [errors.price, errors.admittedPercentage];

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
                        <Accordion classes={{ root: classes.accordionRoot }} expanded={expandedPanel1 || errorsPanel(errorsPanel1, handleChangePanel1)} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <ShieldIcon /> <Typography classes={{ root: classes.accordionTitle }}> Editar equipos que van a disputar el encuentro </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
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
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion classes={{ root: classes.accordionRoot }} expanded={expandedPanel2 || errorsPanel(errorsPanel2, handleChangePanel2)} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <AccessTimeIcon sx={{ marginLeft: '1px' }} /> <Typography classes={{ root: classes.accordionTitle }}> Editar fecha y hora del encuentro </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion classes={{ root: classes.accordionRoot }} expanded={expandedPanel3 || errorsPanel(errorsPanel3, handleChangePanel3)} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <ArticleIcon /> <Typography classes={{ root: classes.accordionTitle }} >  Editar datos administrativos </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
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
                            </AccordionDetails>
                        </Accordion>
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