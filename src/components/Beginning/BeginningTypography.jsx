import Typography from '@mui/material/Typography';


function BeginningTypography({ text, sx, component, variant }) {
    return (
        <Typography
            component={ component || "h1"}
            variant={variant || "h6"}
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