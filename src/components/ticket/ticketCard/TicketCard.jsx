import React from 'react';
import { CardContent, CardMedia } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import QRCode from 'react-qr-code';
import { formatDateAndTime, label, payTicket } from '../../../helpers/usedFunctions';
import CoustomTypography from '../../CoustomTypography';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import PayIcon from '../../../assets/pay_icon.png'
import CustomButton from '../../CoustomButton';


export default function Ticket({ ticket, styleClasses }) {
  const classes = styleClasses(!ticket.isPaid && { opacity: '0.1', filter: 'alpha(opacity=100)' });
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

    <div className={classes.mainContainer}>
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
        <Typography gutterBottom variant="div" component="p" className={classes.reserved}>
          {label(ticket.isPaid ? "Pago registrado" : "Pendiente de pago")}
        </Typography>
        <Box sx={{ displat: 'flex', marginTop: '2vh' }}>
          <CustomButton
            style={{ backgroundColor: '#2e86c1' }}
            disabled={ticket.isPaid}
            variant="contained"
            onClick={() => payTicket(ticket.link)}
          >
            <img src={PayIcon} alt="pay icon" className={classes.iconPaid} />
          </CustomButton>
          <CustomButton
            style={{ backgroundColor: '#2e86c1', margin: '1vh' }}
            disabled={!ticket.isPaid}
            variant="contained"
            onClick={() => onImageCownload()}
          >
            <DownloadIcon />
          </CustomButton>
        </Box>
      </CardContent>
      <CardMedia
        className={classes.cardMedia}
        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
      >

        <QRCode
          className={classes.qr}
          style={{}}
          id="QRCodeGen"
          value={JSON.stringify(ticketQr)}
        />

      </CardMedia>
    </div >


  )
}


