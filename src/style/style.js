import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2e86c1' 
        },
        secondary: {
            main:  '#eecf92'
        },
        text: {
            primary: '#3c3c3c',
        },
        background: {
            paper: {
                main: '#fff',
                secondary: '#eecf92'
            },
        }
    },
    typography: {
        fontSize: 15,
        fontFamily: 'Quicksand',
        fontWeightRegular: 550,
        fontWeightBold: 900
    }
});