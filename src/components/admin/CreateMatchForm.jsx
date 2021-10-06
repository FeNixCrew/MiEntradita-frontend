import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import GridItem from './GridItem';
import BeginningTypography from "../beginning/BeginningTypography";
import matchService from '../../services/MatchService';
import { useEffect, useState } from 'react';
import BackdropInherit from '../feedback/Backdrop';

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
            .then((response) => setTeams([undefined].concat(response.data)))
            .catch((error) => console.log(error.response));
    }, []);

    const renderTeams = () => {
        return teams?.map((team, i) => <MenuItem key={i} value={team?.name}>{team?.name || 'Selecciona un equipo'}</MenuItem>)
    }
    
    return (
        <>
        { teams !== null ?
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
                    <GridItem
                        register={register}
                        name="home"
                        isSelect={true}
                        id="home-id"
                        label="Local"
                        content={renderTeams()}
                        xs={12}
                    />
                    <GridItem
                        register={register}
                        name="away"
                        isSelect={true}
                        id="away-id"
                        label="Visitante"
                        content={renderTeams()}
                        xs={12}
                    />
                    <GridItem
                        register={register}
                        name="date"
                        type="date"
                        isSelect={false}
                        id="date-id"
                        label="Fecha de partido"
                        xs={12}
                    />
    
                    <GridItem
                        register={register}
                        name="time"
                        type="time"
                        isSelect={false}
                        id="time-id"
                        label="Hora de partido"
                        xs={12}
                    />
                    <GridItem
                        register={register}
                        name="price"
                        type="number"
                        isSelect={false}
                        id="price-id"
                        label="Precio"
                        xs={12}
                    />
    
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            <BackdropInherit open={true}/>
        }
        </>
        
    )
}

export default CreateMatchForm;