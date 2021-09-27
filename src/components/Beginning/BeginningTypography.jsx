import Typography from '@mui/material/Typography';


function BeginningTypography({ text }) {
    return (
        <Typography
            component="h1"
            variant="h6"
            sx={{
                fontStyle: 'bold',
                fontFamily: 'Monospace'
            }}>
            {text}
        </Typography>
    )
}

export default BeginningTypography;