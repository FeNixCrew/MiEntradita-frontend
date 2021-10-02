import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';

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
            value === password.current || "Las contraseñas deben coincidir"
    });
    const email = register('email', { required: true, pattern: /^\S+@\S+$/i });
    const dni = register('dni', { required: true });

    const showError = (entity) => {
        return errors[entity] && true
    }

    const getErrorText = (type, entity) => {
        switch (type) {
            case 'required':
                return (`El campo ${entity} es requerido`);
            case 'minLength':
                return (`Su ${entity} debe contener de mas de 6 caracteres`);
            case 'validate':
                return("Las contraseñas deben coincidir")
        }
    }

    const getError = (type, entity, entityName) => {
        return (errors[entity] && errors[entity].type === type && getErrorText(type,entityName))
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={showError('name')}
                        autoComplete="fname"
                        name="name"
                        {...register("name")}
                        fullWidth
                        helperText={getError('required', 'name', 'nombre')}
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
                        error={showError('surname')}
                        id="surname"
                        label="Apellido"
                        name="surname"
                        helperText={getError('required', 'surname', 'apellido')}
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
                        error={showError('username')}
                        name="username"
                        label="Usuario"
                        id="username"
                        helperText={
                            getError('required', 'username', 'usuario') || 
                            getError('minLength', 'username', 'usuario')
                        }

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
                        error={showError('dni')}
                        name="dni"
                        label="Dni"
                        id="dni"
                        helperText={getError('required', 'dni', 'dni')}
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
                        error={showError('email')}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        helperText={getError('required', 'email', 'email')}
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
                        error={showError('password')}
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        helperText={getError('required', 'password', 'contraseña') || getError('minLength', 'password', 'contraseña')}
                        onChange={e => {
                            password.onChange(e);
                            resetError();
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("confirmPassword")}
                        error={showError('confirmPassword')}
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        id="confirmPassword"
                        helperText={getError('validate', 'confirmPassword')}
                        onChange={e => {
                            confirmPassword.onChange(e);
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
                <Grid item sx={{ mb: 2 }}>
                    <Link href="/login" variant="body2">
                        Ya tienes una cuenta? Inica sesion
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RegisterForm;