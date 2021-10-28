import Typography from '@mui/material/Typography';
import { label } from '../helpers/usedFunctions';


function CoustomTypography({ text, sx, component, variant, className }) {
    return (
        <Typography
            className={className || ''}
            component={component || "h1"}
            variant={variant || "h6"}
            style={{ ...sx }}
        >
            {label(text)}
        </Typography>
    )
}

export default CoustomTypography;