import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { label } from '../../helpers/usedFunctions';
import AttributionIcon from '@mui/icons-material/Attribution';

const useStyle = makeStyles((_) => ({
    root: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: '5vh'
    },
    typ: {
        paddingBottom: '2vh',
        fontFamily: 'Quicksand',
        fontSize: '20px'    
    },
    span: {
        fontStyle: 'italic',
        fontFamily: 'Quicksand',
        fontSize: '17px' 
    }
}))

export default function TeamDetailsContent({ teamDetails }) {
    const { name, knowName, stadium, stadiumCapacity } = teamDetails;
    const classes = useStyle();

    return (
        <Box className={classes.root}>
            <Typography className={classes.typ}><ShieldIcon /><span className={classes.span}> {name}</span></Typography>
            <Typography className={classes.typ}><AccessibilityIcon />{label("Popularmente llamado: ")}<span className={classes.span}>{knowName}</span></Typography>
            <Typography className={classes.typ}><LocationOnIcon /><span className={classes.span}> {stadium} </span> </Typography>
            <Typography className={classes.typ}><AttributionIcon /><span className={classes.span}> Capacidad del estadio: {stadiumCapacity} </span> </Typography>

        </Box>
    )

}