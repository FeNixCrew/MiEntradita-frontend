import React from 'react';
import { Card, Button, CardContent, CardMedia, Grid } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import QRCode from 'react-qr-code';
import { useStyles } from './styles';
import { formatDateAndTime, label } from '../../../helpers/usedFunctions';
import CoustomTypography from '../../CoustomTypography';

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

    <Card className={classes.mainContainer}>
      <CardContent className={classes.cardContent}>
        <CoustomTypography
          text={`${ticket.home} vs ${ticket.away}`}
          variant="h5"
          component="div"
          sx={{
            padding: '1vh',
            letterSpacing: 1,
            fontWeight: 700,
            textAlign: 'center'
          }} />
        <CoustomTypography
          text={horarioFormateado}
          variant="p"
          component="div"
          sx={{
            m: 1,
            fontSize: 17,
            letterSpacing: 1,
            fontStyle: 'italic',
            textAlign: 'center'
          }}
        />
        <Button
          className={classes.downloadButton}
          variant="contained"
          onClick={() => onImageCownload()}
        >
          <DownloadIcon />
        </Button>
      </CardContent>
      <CardMedia
        className={classes.cardMedia}
        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      >
        <QRCode
          className={classes.qr}
          id="QRCodeGen"
          value={JSON.stringify(ticketQr)}
          onClick={() => onImageCownload()} />
      </CardMedia>
    </Card>


  )
}