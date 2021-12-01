import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import { Alert, CircularProgress } from '@mui/material';
import { label } from '../../helpers/usedFunctions'
import AddReactionIcon from '@mui/icons-material/AddReaction';


function RegisterForm({ onSubmit, error, resetError, isLoading }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const name = register('name', { required: true, pattern: /^[a-zA-Z0-9_]*$/ });
    const surname = register('surname', { required: true, pattern: /^[a-zA-Z0-9_]*$/ });
    const username = register('username', { required: true, minLength: 6, pattern: /^[a-zA-Z0-9_]*$/ });
    const password = register('password', { required: true, minLength: 6 });

    password.current = watch("password", "");

    const confirmPassword = register('confirmPassword', {
        required: true,
        validate: value =>
            value === password.current || "Las contraseñas deben coincidir"
    });
    const email = register('email', { required: true, pattern: /^\S+@\S+$/i });
    const dni = register('dni', { required: true, pattern: /^(\d{7}|\d{8})$/ });

    const showError = (entity) => {
        return errors[entity] !== undefined;
    }

    const getErrorText = (type, field) => {
        switch (type) {
            case 'required':
                return label(`El campo ${field} es requerido`, true);
            case 'minLength':
                return label(`Su ${field} debe contener de mas de 6 caracteres`, true);
            case 'validate':
                return label("Las contraseñas deben coincidir", true);
            default:
                return label(`Su ${field} es invalido`, true);
        }
    }

    const getError = (type, field, fieldName) => {
        return (errors[field] && errors[field].type === type && getErrorText(type,fieldName))
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
                        helperText={getError('required', 'name', 'nombre') || getError('pattern', 'name', 'nombre')}
                        id="name"
                        label={label("Nombre", true)}
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
                        label={label("Apellido", true)}
                        name="surname"
                        helperText={getError('required', 'surname', 'apellido') || getError('pattern', 'surname', 'apellido')}
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
                        label={label("Usuario", true)}
                        id="username"
                        helperText={
                            getError('required', 'username', 'usuario') || 
                            getError('minLength', 'username', 'usuario') ||
                            getError('pattern', 'username', 'usuario')
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
                        label={label("DNI", true)}
                        id="dni"
                        helperText={getError('required', 'dni', 'dni') || getError('pattern', 'dni', 'dni')}
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
                        label={label("Email", true)}
                        name="email"
                        autoComplete="email"
                        helperText={getError('required', 'email', 'email') || getError('pattern', 'email', 'email')}
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
                        label={label("Contraseña", true)}
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
                        label={label("Confirmar Contraseña", true)}
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
            <LoadingButton
                loading={isLoading}
                endIcon={<AddReactionIcon />}
                loadingPosition="end"
                type="submit"
                size="medium"
                fullWidth
                variant="contained"
                loadingIndicator={<CircularProgress size={20} color="inherit"/>}
                sx={{ mt: 3, mb: 2 }}
            >
                {!isLoading ? label("Registrarse") : label("Registrandote...", true)}
            </LoadingButton>
            <Grid container justifyContent="flex-end">
                <Grid item sx={{ mb: 2 }}>
                    <Link href="/login" variant="body2">
                    {label("¿ Ya tienes una cuenta?")}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RegisterForm;