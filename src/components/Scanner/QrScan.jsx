import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Api from '../../helpers/ApiRest'
import { scannerStyle } from './styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    messageContainer: {
      'margin-top': '2vh'
    }
  },
}));

export default function QrScan() {
  const [comeIn, setComeIn] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const resetMessages = () => {
    setComeIn(null);
    setError(null);
  }

  const handleScan = data => { 
    resetMessages();
    if (data) {
      const {userId, matchId} = JSON.parse(data);
      setOpen(true);
      Api.comeIn(userId, matchId)
        .then(response => {
          setComeIn(response.data);
        })
        .catch((err) => setError(err.response.data.message));
      setOpen(false);
    }
  }

  const handleError = err => {
    console.error(err)
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <QrReader
        delay={5000}
        onError={handleError}
        onScan={handleScan}
        style={scannerStyle}
      />
      <div className={classes.messageContainer}>
      {error && <Alert severity="error">{error}</Alert>}
      {comeIn && <Alert severity="success">{comeIn}</Alert>}
      </div>
    </div>
  )
}