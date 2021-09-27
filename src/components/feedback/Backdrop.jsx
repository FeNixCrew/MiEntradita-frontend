import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';


export const useBackdrop = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false)

    const handleToggle = () => setOpen(!open)

    return {
        open,
        handleClose,
        handleToggle
    }
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function BackdropInherit({open}){
    const classes = useStyles();
    return(
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackdropInherit;