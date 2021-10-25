import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: '275vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 15,
  },
  pos: {
    marginBottom: 12,
  },
  downloadButton: {
    'margin-top': '2vh',
    'width': 40,
    'height': 40,
  },
  qr: {
    '&:hover': {
      cursor: 'pointer',
    },
    'margin-top': '4vh',
    'margin-bottom': '4vh',
    'margin-right': '5vh',
    
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '70vh'
  },
  cardMedia: {
    marginLeft: 'auto'
  },

  mainContainer: {
    'background-color': '#ffe0b2',
    'border-radius': '6px',
    minWidth: '60vw', 
    maxWidth: '60vw',
    minHeight: '20vw',
    display: 'flex', 
    flexDirection: 'rows', 
    alignItems: 'center'
  },
  downloadButton: {
    backgroundColor: '#2e86c1',
    padding: '1vh',
    'margin': '2.5vh',
    'width': 50,
    'height': 40,
  },
});