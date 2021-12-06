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
  qr: (props) => ({
    'margin-top': '4vh',
    'margin-bottom': '1vh',
    'margin-right': '5vh',
    opacity: props.opacity,
    filter: props.filter,
  }),
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
    minWidth: '60vw',
    maxWidth: '60vw',
    minHeight: '20vw',
    display: 'flex',
    flexDirection: 'rows',
    alignItems: 'center',

  },
  button: {
    backgroundColor: '#2e86c1',
    padding: '1vh',
    'margin': '2.5vh',
    'width': 50,
    'height': 40,
  },
  reserved: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 15
  },
  iconPaid: {
    width: '4vh',
    height: '4.2vh'
  },
  notAvailableImg: {
    width: '50px',
    height: '50px',
    marginTop: '8vh',
    marginLeft: '4.8vh',
    marginRight: 'auto',
    backgroundColor: '#ffffff',
    opacity: '0.3',
    filter: 'alpha(opacity=100)',
    position: 'absolute'
  }
});

export const useStylesMobile = makeStyles((_) => ({
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
  button: {
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
  qr: (props) => ({
    'margin-left': '1vh',
    'margin-right': '1vh',
    'margin-bottom': '1vh',
    opacity: props.opacity,
    filter: props.filter,
  }),
  cardMedia: {
    display: 'grid',
    justifyContent: 'center'
  },
  mainContainer: {
    'display': 'grid',
    'justify-content': 'center'
  },
  reserved: {
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 15
  },
  iconPaid: {
    width: '3.5vh',
    height: '3.2vh'
  },
  notAvailableImg: {
    width: '50px',
    height: '50px',
    marginTop: '3vh',
    marginLeft: '8.5vh',
    marginRight: 'auto',
    backgroundColor: '#ffffff',
    opacity: '0.3',
    filter: 'alpha(opacity=100)',
    position: 'absolute'
  }
}))
