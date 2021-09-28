import { useForm } from "react-hook-form";
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function LoginForm({ onSubmit, error, resetError }) {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const username = register('username', { required: true });
    const password = register('password', { required: true });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
                {...register("username")}
                margin="normal"
                fullWidth
                label="Usuario"
                type="text"
                autoFocus
                onChange={(e) => {
                    username.onChange(e);
                    resetError();
                }}
            />
            <TextField
                {...register("password")}
                margin="normal"
                fullWidth
                label="Contraseña"
                type="password"
                onChange={(e) => {
                    password.onChange(e);
                    resetError();
                }}
            />
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
                    {"Sin registrarse? Click aqui"}
                </Link>
            </Grid>
            <div>
                {error && <Alert severity="error">{error.message}</Alert>}
                {errors.username && errors.username.type === "required" && <Alert severity="error">El campo usuario no puede estar vacio</Alert>}
                {errors.password && errors.password.type === "required" && <Alert severity="error">El campo contraseña no puede estar vacio</Alert>}
            </div>
        </Box>
    )
}

export default LoginForm;