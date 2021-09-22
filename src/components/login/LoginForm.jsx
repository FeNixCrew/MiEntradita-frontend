import { Box, Button, TextField, Alert, useForm } from './dependencies'

function LoginForm({onSubmit,error,resetError}) {
    const { register, handleSubmit } = useForm();
    const username = register('username');
    const password = register('password');

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
            <div>
                {error && <Alert severity="error">{error.message}</Alert>}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Ingresar
            </Button>
        </Box>
    )
}

export default LoginForm;