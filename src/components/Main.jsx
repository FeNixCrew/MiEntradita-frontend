import React, { useState, useEffect } from 'react';
import Tickets from './TicketsCarousel';
import '../App.css'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import QrScan from './QrScan';

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
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function Main() {
  const [value, setValue] = useState(0);
  
  const isAdmin = () => {
    return localStorage.getItem('role') === 'admin'
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        document.body.style = "background-color: #fffff;"
    })

    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Tickets" {...a11yProps(0)} /> 
                    { isAdmin() && <Tab label="Scanner" {...a11yProps(1)} /> }
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Tickets />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="qrscancontainer">
                    <QrScan/>
                </div>
            </TabPanel>
        </div>
    )
}