import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid } from '@mui/material';
import { equipos } from '../../equipos'
import { useForm } from 'react-hook-form';
import GridItem from './GridItem';

const renderTeams = () => {
    return equipos.map((equipo, i) => <MenuItem key={i} value={equipo}>{equipo}</MenuItem>)
}

function CreateMatchForm({ onSubmit }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            date: (new Date().toJSON().split("T")[0]),
            time: (new Date().toLocaleTimeString()),
            price: 200
        }
    });

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                <AddIcon sx={{ mr: 1 }} /> Crear partido
            </Button>
        </Box>
    )
}

export default CreateMatchForm;