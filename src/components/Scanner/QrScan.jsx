import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Api from '../../helpers/ApiRest'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function QrScan({ tickets }) {
  const [game, setGame] = useState("Pendiente");
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleScan = data => {
    if (data) {
      const result = JSON.parse(data);
      handleToggle();
      Api.comeIn(result.matchId)
        .then(response => {
          setGame(response.data)
        })
        .catch(() => setGame("No podes entrar"))
      handleClose();
    }
  }
  const handleError = err => {
    console.error(err)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <QrReader
        delay={400}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '50%' }}
      />
      <h2>Estado del escaneo: {game}</h2>
    </div>
  )
}