import GridItem from "../layout/GridItem";
import { Box, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CoustomTypography from "../CoustomTypography";
import { label } from '../../helpers/usedFunctions'


function CreateTeamForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            knowName: '',
            stadium: ''
        }
    });

    register('name', { required: true });
    register('knowName', { required: true });
    register('stadium', { required: true });

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const getError = (field, fieldName) => {
        return (errors[field] && errors[field].type === 'required' && `${fieldName} es obligatorio`)
    }

    return (
        <> 
            <div style={{ paddingTop: '3vh' }} />
            <CoustomTypography text={label("Nuevo Equipo")} />
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
                </Grid>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2vh' }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ marginTop: 3, marginBottom: 2, maxWidth: '50%', backgroundColor: '#2e86c1' }}
                    >
                        <AddModeratorIcon style={{ marginRight: '1vw' }} /> {label("Crear equipo")}
                    </Button>
                </Box>
            </Paper>
        </>
    )
}

export default CreateTeamForm;