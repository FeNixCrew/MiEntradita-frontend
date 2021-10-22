import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDateAndTime } from '../../helpers/usedFunctions';


export default function MatchDetailsContent({ matchDetails }) {
    const { matchStartTime, ticketPrice, stadium } = matchDetails;
    let date = (formatDateAndTime(new Date(matchStartTime))).split(' ')[0];
    let time = (formatDateAndTime(new Date(matchStartTime))).split(' ')[1];
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
        <Typography style={{ paddingBottom: 3 }}><DateRangeIcon /><span style={{ fontStyle: 'italic' }}> {date}</span></Typography>
        <Typography style={{ paddingBottom: 3 }}><AccessTimeIcon /> <span style={{ fontStyle: 'italic' }}>{time}</span></Typography>
        <Typography style={{ paddingBottom: 3 }}><LocationOnIcon /> <span style={{ fontStyle: 'italic' }}> {stadium} </span> </Typography>
        <Typography style={{ paddingBottom: 3 }}><MonetizationOnIcon /> <span style={{ fontStyle: 'italic' }}>Precio por entrada:</span> ${ticketPrice}</Typography>
      </Box>
    )
  
  }