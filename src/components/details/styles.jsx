import { makeStyles } from '@material-ui/core/styles';

export const useStylesDesktop = makeStyles((_) => ({
    mainContainer: {
        minWidth: '60vw',
        maxWidth: '60vw',
        minHeight: '20vw',
        display: 'flex',
        flexDirection: 'rows',
        alignItems: 'center',

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
    }
}));

export const useStylesMobile = makeStyles((_) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardContent: {
        display: 'grid',
        justifyContent: 'center',
        textAlign: 'center'
    },
    map: {
        width: '270px',
        height: '180px'
    }
}));