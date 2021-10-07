import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useEffect } from 'react';
import { useState } from 'react';
import matchService from '../services/MatchService.js';
import { formatDateAndTime } from '../helpers/usedFunctions';
import {  Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#2e86c1' }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function MatchDetailsContent({ matchDetails }) {
  const { matchStartTime, ticketPrice, stadium } = matchDetails;
  let date = (formatDateAndTime(new Date(matchStartTime))).split(' ')[0];
  let time = (formatDateAndTime(new Date(matchStartTime))).split(' ')[1];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
      <Typography sx={{ paddingBottom: 3 }}><DateRangeIcon/><span style={{ fontStyle: 'italic' }}> {date}</span></Typography>
      <Typography sx={{ paddingBottom: 3 }}><AccessTimeIcon/> <span style={{ fontStyle: 'italic' }}>{time}</span></Typography>
      <Typography sx={{ paddingBottom: 3 }}><LocationOnIcon/> <span style={{ fontStyle: 'italic' }}> {stadium} </span> </Typography>
      <Typography sx={{ paddingBottom: 3 }}><MonetizationOnIcon/> <span style={{ fontStyle: 'italic' }}>Precio por entrada:</span> ${ticketPrice}</Typography>
    </Box>
  )

}

export default function MatchDetails({ open, handleClose, matchId, title }) {
  const [matchDetails, setMatchDetails] = useState(undefined); 

  useEffect(() => {
    matchService.getMatchDetails(matchId)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setMatchDetails(response.data);
        } else {
          console.log("Error status code:" + response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <MatchDetailsContent matchDetails={matchDetails} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}