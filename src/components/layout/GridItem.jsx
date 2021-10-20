import { TextField, InputLabel, Grid } from '@mui/material';

export default function GridItem({ register, type, name, id, label, xs, content, showError, helperText }) {


    return (
        <Grid item xs={xs} >
            <InputLabel id={id} style={{ paddingBottom: 1}}>{label}</InputLabel>
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