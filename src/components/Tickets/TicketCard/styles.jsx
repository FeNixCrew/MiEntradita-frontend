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