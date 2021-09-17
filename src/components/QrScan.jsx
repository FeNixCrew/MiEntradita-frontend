import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import { tickets } from '../datos';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function QrScan() {
  const [game, setGame] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleScan = data => {
    if (data) {
      handleToggle();
      setTimeout(() => {handleClose();},400);
      const result = JSON.parse(data);
      setGame(tickets.find(ticket => ticket.matchId === result.matchId && ticket.userId === result.userId));
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
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '50%' }}
      />
      <h2>Id Usuario: {game && game.userId}</h2>
      <h3>Partido: {game && `${game.home} vs ${game.away}`}</h3>
    </div>
  )
}