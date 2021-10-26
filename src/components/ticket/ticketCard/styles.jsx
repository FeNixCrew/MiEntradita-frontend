import { makeStyles } from '@material-ui/core/styles';

export const useStylesDesktop = makeStyles({
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

export const useStylesMobile = makeStyles((theme) => ({
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
    'width': 80,
    'height': 40,
    backgroundColor: '#2e86c1',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '70vh'
  },
  qr: {
    'margin-left': '2vh',
    'margin-right': '2vh',
    'margin-bottom': '3vh'
  },
  cardMedia: {
    display: 'grid',
    justifyContent: 'center'
  },
  mainContainer: {
    'background-color': '#ffe0b2',
    'margin': '1vh',
    'display': 'grid',
    'border-radius': '6px',
    'justify-content': 'center'
  }
}))
