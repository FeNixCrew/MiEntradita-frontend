import { useState } from 'react';

import Scanner from '../components/scanner/Scanner';
import SelectMatch from '../components/scanner/SelectMatch';

export default function QrScan() {
  const [match, setMatch] = useState(null);
  
  return(
    <div>
      {
        match ?
          <Scanner match={match} setMatch={setMatch}/>
          :
          <SelectMatch setMatch={setMatch}/>
      }
    </div>
  )
}