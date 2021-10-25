import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { Divider, Grid, Fab, Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router';


function Error({statusCode, errorMessage}) {
    const theme = createTheme();
    const history = useHistory();

    return (
        <ThemeProvider theme={theme} >
            <Grid sx={{
                display: 'grid',
                justifyContent: 'center',
                marginTop: '20vh',
                backgroundColor: '#d7dbdd',
                ml: '5vh',
                mr: '5vh'

            }}>
                <Typography
                    variant='h1'
                    sx={{
                        color: '#2e86c1',
                        fontFamily: 'Roboto, monospace',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: '1vh'
                    }}
                >
                    {statusCode}
                </Typography>
                <Divider sx={{ borderColor: 'black', }} />
                <Typography
                    variant='h3'
                    sx={{
                        color: 'black',
                        p: '1vh',
                        fontFamily: 'Monospace',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    {errorMessage}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: '5vh'
                    }}>
                    <IconButton>
                        <Fab
                            style={{
                                backgroundColor: '#2e86c1',
                                color: 'black',
                                ":hover": { color: '#2e86c1' }
                            }}
                            aria-label="login"
                            onClick={() => history.push('/')}
                        >
                            <HomeIcon />
                        </Fab>
                    </IconButton>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}

export default Error;