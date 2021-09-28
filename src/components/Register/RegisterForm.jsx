import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';

function RegisterForm({onSubmit, error, resetError}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const name = register('name', { required: true, minLength: 6 });
    const surname = register('surname', { required: true, minLength: 6 });
    const username = register('username', { required: true, minLength: 6 });
    const password = register('password', { required: true, minLength: 6 });
    const email = register('email', { required: true, pattern: /^\S+@\S+$/i });
    const dni = register('dni', { required: true });

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
                        onChange={e => {
                            name.onChange(e);
                            resetError();
                        }}
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
                        onChange={e => {
                            surname.onChange(e);
                            resetError();
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...register("username")}
                        fullWidth
                        name="username"
                        label="Usuario"
                        id="username"
                        onChange={e => {
                            username.onChange(e);
                            resetError();
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        {...register("dni")}
                        fullWidth
                        name="dni"
                        label="Dni"
                        id="dni"
                        onChange={e => {
                            dni.onChange(e);
                            resetError();
                        }}
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
                        onChange={e => {
                            email.onChange(e);
                            resetError();
                        }}
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
                        onChange={e => {
                            password.onChange(e);
                            resetError();
                        }}
                    />
                </Grid>
            </Grid>
            <div>
                {error && <Alert severity="error">{error.message}</Alert>}
            </div>
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