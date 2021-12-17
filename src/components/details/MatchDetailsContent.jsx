import { Box, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDateAndTime } from '../../helpers/usedFunctions';
import AttributionIcon from '@mui/icons-material/Attribution';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AssignmentIcon from '@mui/icons-material/Assignment';

const useStyle = makeStyles((_) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2vh',
    marginRight: '5vh'
  },
  typ: {
    paddingBottom: '2vh',
    fontFamily: 'Quicksand',
    fontSize: '18px'
  },
  span: {
    fontStyle: 'italic',
  }
}))

export default function MatchDetailsContent({ matchDetails }) {
  const { matchStartTime, ticketPrice, stadium, capacitySupported, availableTickets, percentageOfCapacityAllowed } = matchDetails;
  let date = (formatDateAndTime(new Date(matchStartTime))).split(' ')[0];
  let time = (formatDateAndTime(new Date(matchStartTime))).split(' ')[1];
  const classes = useStyle();

  return (
    <Box classes={{ root: classes.root }}>
      <Typography classes={{ root: classes.typ }}><DateRangeIcon /><span className={classes.span}> {date}</span></Typography>
      <Typography classes={{ root: classes.typ }}><AccessTimeIcon /> <span className={classes.span}>{time}</span></Typography>
      <Typography classes={{ root: classes.typ }}><AssignmentIcon /> <span className={classes.span}>Aforo permitido: {percentageOfCapacityAllowed}%</span></Typography>
      <Typography classes={{ root: classes.typ }}><LocationOnIcon /> <span className={classes.span}> {stadium} </span> </Typography>
      <Typography classes={{ root: classes.typ }}><AttributionIcon /> <span className={classes.span}>Capacidad permitida:</span> {capacitySupported} personas</Typography>
      <Typography classes={{ root: classes.typ }}><MonetizationOnIcon /> <span className={classes.span}>Precio por entrada:</span> ${ticketPrice}</Typography>
      <Typography classes={{ root: classes.typ }}><ConfirmationNumberIcon /> <span className={classes.span}>Cantidad de entradas disponibles</span> {availableTickets}</Typography>

    </Box>
  )

}