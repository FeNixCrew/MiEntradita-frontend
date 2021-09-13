import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router'

export default function QrScan() {
  const [result,setResult] = useState(null);
  let codigoCorrecto = "1234";
  const history = useHistory();

  const handleScan = data => {
    if(data){
      setResult(data)
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
      <a>{result}</a>
    </div>
  )
}