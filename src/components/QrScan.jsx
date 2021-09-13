import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router'

export default function QrScan() {
  const [result,setResult] = useState(null);
  let codigoCorrecto = "1234";
  const history = useHistory();

  const handleScan = data => {
    setResult(data)
    if(result === null) return 0;
    if (result === codigoCorrecto) {
      history.push('/green')
    } else {
      history.push('/red')
    }
  }
  const handleError = err => {
    console.error(err)
  }
  return (
    <div>
      <QrReader
        onError={(err) => handleError(err)}
        onScan={(data) => handleScan(data)}
        style={{ width: '50%' }}
      />
    </div>
  )
}