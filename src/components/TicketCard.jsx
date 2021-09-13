import React, { useState } from 'react';
import { Card, Button } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  });



  
export default function Ticket(props) {
    const [show, setShow] = useState(false);
    const classes = useStyles();

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
            downloadLink.download = "QRCode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    return (
        <Card class="mainContainer">
            <h2><span img={props.ticket.homeSpan} />{props.ticket.home} vs {props.ticket.away}</h2>
            <h4>Fecha: {new Date(props.ticket.gameTime).toLocaleDateString()}</h4>


            <div className="buttonContainer">
                <Button variant="contained" color="primary" onClick={() => setShow(!show)} startIcon={<VisibilityIcon />}>See QR</Button>
            </div>

            <div className="qrContainer">
                {show && <QRCode id="QRCodeGen" value={(props.ticket.userId.toString()) + (props.ticket.matchId.toString())} />}
                {show && <Button variant="contained" color="primary" startIcon={<GetAppIcon />} onClick={() => onImageCownload()}>Download QR</Button>}
            </div>

            {console.log((props.ticket.userId.toString()) + (props.ticket.matchId.toString()))}
        </Card>
    )
}