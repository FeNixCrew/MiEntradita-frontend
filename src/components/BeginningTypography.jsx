import Typography from '@mui/material/Typography';


function BeginningTypography({ text, sx, component, variant, className }) {
    return (
        <Typography
            className={className || ''}
            component={ component || "h1"}
            variant={variant || "h6"}
            style={{
                fontStyle: 'bold',
                fontFamily: 'Monospace',
                ...sx
                
            }}>
            {text}
        </Typography>
    )
}

export default BeginningTypography;