import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import './style.css'

function RegisterForm({ onSubmit, error, resetError }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
 
    const name = register('name', { required: true });
    const surname = register('surname', { required: true });
    const username = register('username', { required: true, minLength: 6 });
    const password = register('password', { required: true, minLength: 6 });

    password.current = watch("password", "");

    const confirmPassword = register('confirmPassword', {
        required: true,
        validate: value =>
            value === password.current || "Las contraseñas no coinciden"
    });
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
                    {errors.name && errors.name.type === "required" && <p>Campo Nombre requerido</p>}
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
                    {errors.surname && errors.surname.type === "required" && <p>Campo Apellido requerido</p>}
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
                    {errors.username && errors.username.type === "required" && <p>Campo Usuario requerido</p>}
                    {errors.username && errors.username.type === "minLength" && <p>El usuario debe ser de mas de 6 caracteres</p>}
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
                    {errors.dni && errors.dni.type === "required" && <p>Campo Dni requerido</p>}
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
                    {errors.email && errors.email.type === "required" && <p>Campo Email requerido</p>}
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
                    {errors.password && errors.password.type === "required" && <p>Campo Contraseña requerido</p>}
                    {errors.password && errors.password.type === "minLength" && <p>La contraseñá debe ser de mas de 6 caracteres</p>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("confirmPassword")}
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        id="confirmPassword"
                        onChange={e => {
                            confirmPassword.onChange(e);
                            resetError();
                        }}
                    />
                    {errors.confirmPassword && errors.confirmPassword.type === "validate" && <p>{errors.confirmPassword.message}</p>}
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