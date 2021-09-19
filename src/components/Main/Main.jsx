import React, { useState, useEffect } from 'react';
import Tickets from '../Tickets/TicketsCarousel';
import '../../App.css'
import { useLocation } from 'react-router';
import Box from '@material-ui/core/Box';
import QrScan from '../Scanner/QrScan';

import NavigationBar from './NavigationBar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Main() {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const tickets = location.state.userData;

  useEffect(() => {
    document.body.style = "background-color: #fffff;"
  })

  return (
    <div>
      <NavigationBar value={value} setValue={setValue}/>

      <TabPanel value={value} index={0}>
        <Tickets tickets={tickets} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="qrscancontainer">
          <QrScan />
        </div>
      </TabPanel>
    </div>
  )
}