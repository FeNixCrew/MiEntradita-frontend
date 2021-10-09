import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.26),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.20),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '68vh',
    },
}));