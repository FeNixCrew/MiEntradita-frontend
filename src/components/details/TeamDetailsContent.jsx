import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function TeamDetailsContent({ teamDetails }) {
    const { name, knowName, stadium } = teamDetails;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
            <Typography style={{ paddingBottom: 3 }}><ShieldIcon /><span style={{ fontStyle: 'italic' }}> {name}</span></Typography>
            <Typography style={{ paddingBottom: 3 }}><AccessibilityIcon />Popularmente llamado: <span style={{ fontStyle: 'italic' }}>{knowName}</span></Typography>
            <Typography style={{ paddingBottom: 3 }}><LocationOnIcon /><span style={{ fontStyle: 'italic' }}> {stadium} </span> </Typography>
        </Box>
    )

}