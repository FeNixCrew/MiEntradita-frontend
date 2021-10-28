import { TextField, InputLabel, Grid } from '@mui/material';
import { label } from '../../helpers/usedFunctions'

export default function GridItem({ register, type, name, id, givenLabel, xs, content, showError, helperText }) {


    return (
        <Grid item xs={xs} >
            <InputLabel id={id} style={{ paddingBottom: 1}}>{label(givenLabel)}</InputLabel>
            <TextField
                {...register(name)}
                error={showError}
                helperText={helperText}
                id={id}
                type={type || ""}
                name={name}
                fullWidth
            >
                {content}
            </TextField>
        </Grid>
    )

}