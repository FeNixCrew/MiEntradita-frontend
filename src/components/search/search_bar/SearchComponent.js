import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, .1),
    borderColor: '#808b96',
    borderStyle: 'solid',
    borderWidth: '1px',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '68vh',
    },
}));