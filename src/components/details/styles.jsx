import { makeStyles } from '@material-ui/core/styles';

export const useStylesDesktop = makeStyles((_) => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    cardContent: {
        display: 'grid',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(auto-fit, 90vh)',
        minHeight: '84vh',
        margin: '3vh',
        padding: '4vh',
        borderRadius: '2vh'
    },
    mapContainer: {
        position: 'absolute',
        right: '5vh',
        top: '12vh',
        borderRadius: '5vh'
    },
    map: {
        width: '610px',
        height: '500px',
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