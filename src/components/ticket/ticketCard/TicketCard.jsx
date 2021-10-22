import React from 'react';
import { Card, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import QRCode from 'react-qr-code';
import { useStyles } from './styles';
import Typography from '@mui/material/Typography';
import { formatDateAndTime } from '../../../helpers/usedFunctions';
import { Box } from '@mui/system';

export default function Ticket({ ticket }) {
  const classes = useStyles();
  const horarioFormateado = formatDateAndTime(ticket.matchStartTime);
  const ticketQr = {
    userId: ticket.userId,
    matchId: ticket.matchId
  };

  const onImageCownload = () => {
    const svg = document.getElementById("QRCodeGen");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${ticket.home} vs ${ticket.away}- ${horarioFormateado}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div>
      <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)' }}>
        <Card  className={classes.mainContainer} style={{minWidth:'50vw'}}>
          <Typography
            variant="h5"
            component="div"
            style={{
              margin: 'auto',
              padding: '1vh',
              letterSpacing: 1,
              textAlign: 'center'
            }}>
            {ticket.home} vs {ticket.away}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            style={{
              m: 1,
              letterSpacing: 2,
              textAlign: 'center'
            }}
          >
            {horarioFormateado}
          </Typography>
          <div className={classes.qrContainer}>
            <QRCode
              id="QRCodeGen"
              className={classes.qr}
              value={JSON.stringify(ticketQr)} />
            <div style={{ display: 'grid', justifyContent: 'center' }}>
              <Button
                className={classes.downloadButton}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onImageCownload()}>
                <GetAppIcon />
              </Button>
            </div>
          </div>
        </Card>
      </Box>
    </div>

  )
}