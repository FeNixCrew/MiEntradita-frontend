import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { makeStyles } from "@material-ui/core";
import { label } from '../../helpers/usedFunctions'
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles((_) => ({
    root: {
        marginTop: '5vh',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, auto-fit)',
        justifyContent: 'center',
        maxWidth: '41vh',
        padding: '2vh'
    },
    textField: {
        width: '41vh',
    },
    button: {
        backgroundColor: '#2e86c1',
        marginTop: '5vh',
        marginBottom: '2vh'
    }
}))

function LoginForm({ onSubmit, error, resetError, isLoading }) {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const username = register('username', { required: true });
    const password = register('password', { required: true });
    const classes = useStyle();

    return (
        <Box
            className={classes.root}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <TextField
                {...register("username")}
                error={errors.username && errors.username.type === "required"}
                className={classes.textField}
                margin="normal"
                label={label('Usuario', true)}
                type="text"
                autoFocus
                helperText={errors.username && label("El campo usuario no puede estar vacio", true)}
                onChange={(e) => {
                    username.onChange(e);
                    resetError();
                }}
                inputProps={{
                    'data-testid': 'username'
                }}
            />
            <TextField
                {...register("password")}
                className={classes.textField}
                error={errors.password && errors.password.type === "required"}
                margin="normal"
                label={label('Contraseña', true)}
                type="password"
                helperText={errors.password && label("El campo contraseña no puede estar vacio", true)}
                onChange={(e) => {
                    password.onChange(e);
                    resetError();
                }}
                inputProps={{
                    'data-testid': 'password'
                }}
            />
            <div>
                {error && <Alert data-testid='error' severity="error">{error}</Alert>}
            </div>
            <div className={classes.button}>
                <LoadingButton
                    loading={isLoading}
                    endIcon={<LoginIcon />}
                    loadingPosition="end"
                    type="submit"
                    size="medium"
                    fullWidth
                    data-testid='login-button'
                    onClick={() => {
                        const { username, password } = getValues();
                        if (username && password) onSubmit({ username, password });
                    }}
                    variant="contained"
                    loadingIndicator={<CircularProgress size={20} color="inherit"/>}
                >
                    {!isLoading ? label("Ingresar") : label("Ingresando...", true)}
                </LoadingButton>
            </div>
            <Grid item>
                <Link href="/register" variant="body2">
                    {label("¿Sin registrarse?")}
                </Link>
            </Grid>
        </Box>
    )
}

export default LoginForm;
