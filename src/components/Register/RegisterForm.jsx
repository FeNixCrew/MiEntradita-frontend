import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";

function RegisterForm({onSubmit}) {
    const { register, handleSubmit } = useForm();

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="name"
                        {...register("name")}
                        fullWidth
                        id="name"
                        label="Nombre"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...register("surname")}
                        fullWidth
                        id="surname"
                        label="Apellido"
                        name="surname"
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...register("username")}
                        fullWidth
                        name="username"
                        label="Usuario"
                        id="username"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...register("dni")}
                        fullWidth
                        name="dni"
                        label="Dni"
                        id="dni"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("email")}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("password")}
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        Ya tienes una cuenta? Inica sesion
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RegisterForm;