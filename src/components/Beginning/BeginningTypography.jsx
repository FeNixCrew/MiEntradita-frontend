import Typography from '@mui/material/Typography';


function BeginningTypography({ text, sx }) {
    return (
        <Typography
            component="h1"
            variant="h6"
            sx={{
                fontStyle: 'bold',
                fontFamily: 'Monospace',
                ...sx
                
            }}>
            {text}
        </Typography>
    )
}

export default BeginningTypography;