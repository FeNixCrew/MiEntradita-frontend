import React from 'react';
import { Card, Button } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import QRCode from 'react-qr-code';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    downloadButton: {
      display: 'block',
      'margin': '2vh'
    },
    qr: {
      'margin-left': '5vh',
      'margin-right': '5vh'
    },
    mainContainer: {
      'background-color':  '#229954',
      'display': 'grid',
      'border-radius': '5px',
      'justify-content': 'center'
    }
  });

  
export default function Ticket({ticket}) {
    const classes = useStyles();
    const _horario = new Date(ticket.gameTime);
    const horarioFormateado = `${_horario.toLocaleDateString()}, ${_horario.toLocaleTimeString().slice(0,-3)} hs`;
    const ticketQr = {
      userId: ticket.userId,
      matchId: ticket.matchId
    }

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
            <h2><span img={ticket.homeSpan} />{ticket.home} vs {ticket.away}</h2>
            <h4>{horarioFormateado}</h4>
                <QRCode
                  id="QRCodeGen"
                  className={classes.qr} 
                  value={JSON.stringify(ticketQr)} />
            <Button 
            className={classes.downloadButton} 
            variant="contained"  
            color="primary" 
            startIcon={<GetAppIcon />} 
            onClick={() => onImageCownload()}>
          </Button>
        </Card>
    )
}