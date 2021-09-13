import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router'
import { tickets } from '../datos';

export default function QrScan() {
  const [game, setGame] = useState(null);

  const handleScan = data => {
    if(data){
      const result = JSON.parse(data);
      setGame(tickets.find(ticket => ticket.matchId === result.matchId && ticket.userId === result.userId));
    }
  }
  const handleError = err => {
    console.error(err)
  }
  return (
    <div>
      <QrReader
        onError={handleError}
        onScan={handleScan}
        style={{ width: '50%' }}
      />
      <h2>Id Usuario: {game && game.userId}</h2>
      <h3>Partido: {game && `${game.home} vs ${game.away}`}</h3>
    </div>
  )
}