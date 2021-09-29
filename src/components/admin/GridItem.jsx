import { TextField, InputLabel, Grid } from '@mui/material';

export default function GridItem({ register, type, name, id, isSelect, label, xs, content }) {


    return (
        <Grid item xs={xs} >
            <InputLabel id={id}>{label}</InputLabel>
            <TextField
                select={isSelect}
                {...register(name)}
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