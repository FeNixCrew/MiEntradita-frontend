import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function LoginForm({ onSubmit, error, resetError }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const username = register('username', { required: true });
    const password = register('password', { required: true });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                mt: 5,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, auto-fit)',
                justifyContent: 'center',
                maxWidth: '41vh',
                p: 2
            }}
        >
            <TextField
                {...register("username")}
                error={errors.username && errors.username.type === "required"}
                margin="normal"
                label="Usuario"
                type="text"
                autoFocus
                sx={{width: '41vh'}}
                helperText={errors.username && "El campo usuario no puede estar vacio"}
                onChange={(e) => {
                    username.onChange(e);
                    resetError();
                }}
            />
            <TextField
                {...register("password")}
                error={errors.password && errors.password.type === "required"}
                margin="normal"
                label="Contraseña"
                type="password"
                sx={{width: '41vh'}}
                helperText={errors.password && "El campo contraseña no puede estar vacio"}
                onChange={(e) => {
                    password.onChange(e);
                    resetError();
                }}
            />
            <div>
                {error && <Alert severity="error">{error.message}</Alert>}
            </div>

            <Button
                style={{
                    backgroundColor: '#2e86c1'
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Ingresar
            </Button>
            <Grid item>
                <Link href="/register" variant="body2">
                    Sin registrarse?
                </Link>
            </Grid>
        </Box>
    )
}

export default LoginForm;