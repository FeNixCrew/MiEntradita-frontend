import { makeStyles } from '@material-ui/core/styles';

export const useStylesDesktop = makeStyles((theme) => ({
    mainContainer: {
        minWidth: '60vw',
        maxWidth: '60vw',
        minHeight: '20vw',
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    title: {
        color: 'white',
        backgroundColor: '#2e86c1',
        fontFamily: 'Quicksand'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '70vh'
    },
    map: {
        width: '410px',
        height: '390px',
        marginRigth: '1vh'
    },
    button: {
        color: '#2e86c1',
        fontFamily: 'Quicksand',
        fontSize: 15
    }
}));

export const useStylesMobile = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    title: {
        color: 'white',
        backgroundColor: '#2e86c1',
        fontFamily: 'Quicksand'
    },
    cardContent: {
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center'
    },
    map: {
        width: '270px',
        height: '180px'
    },
    button: {
        color: '#2e86c1',
        fontFamily: 'Quicksand',
        fontSize: 15
    }
}));