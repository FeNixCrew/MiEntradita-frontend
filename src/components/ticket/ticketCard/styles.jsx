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
    'margin-bottom': '3vh',
    'width': 40,
    'height': 40,
  },
  qr: {
    '&:hover': {
      cursor: 'pointer',
    },
    'margin-top': '2vh',
    'margin-left': '5vh',
    'margin-right': '5vh',
    
  },
  qrContainer: {
    display: 'grid',
    justifyContent: 'center',
    'margin-bottom': '5vh'
  },
  mainContainer: {
    'background-color': '#eecf92',
    'display': 'grid',
    'border-radius': '6px',
    'justify-content': 'center'
  }
});