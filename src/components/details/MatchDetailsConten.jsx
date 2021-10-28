import { Box, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDateAndTime } from '../../helpers/usedFunctions';

const useStyle = makeStyles((theme) => ({
  root: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      paddingTop: '2vh'
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

export default function MatchDetailsContent({ matchDetails }) {
    const { matchStartTime, ticketPrice, stadium } = matchDetails;
    let date = (formatDateAndTime(new Date(matchStartTime))).split(' ')[0];
    let time = (formatDateAndTime(new Date(matchStartTime))).split(' ')[1];
    const classes = useStyle();
  
    return (
      <Box className={classes.root}>
        <Typography className={classes.typ}><DateRangeIcon /><span className={classes.span}> {date}</span></Typography>
        <Typography className={classes.typ}><AccessTimeIcon /> <span className={classes.span}>{time}</span></Typography>
        <Typography className={classes.typ}><LocationOnIcon /> <span className={classes.span}> {stadium} </span> </Typography>
        <Typography className={classes.typ}><MonetizationOnIcon /> <span className={classes.span}>Precio por entrada:</span> ${ticketPrice}</Typography>
      </Box>
    )
  
  }