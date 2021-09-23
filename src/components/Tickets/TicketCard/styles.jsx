import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
      'margin': '2.5vh',
      'margin-left': '20vh',
      'width': 80,
      'height': 40,
    },
    qr: {
      'margin-left': '5vh',
      'margin-right': '5vh'
    },
    qrContainer: {
      display: 'grid',
      justifyContent: 'center'
    },
    mainContainer: {
      'background-color':  '#2e86c1',
      'display': 'grid',
      'border-radius': '6px',
      'justify-content': 'center'
    }
  });