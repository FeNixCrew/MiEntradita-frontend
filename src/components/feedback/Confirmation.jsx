import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { label } from '../../helpers/usedFunctions';

const useStyle = makeStyles((_) => ({
    button: {
        color: '#2e86c1',
        fontFamily: 'Quicksand',
        fontSize: 15,
        fontWeight: 550
    }
}))

export default function Confirmation({ open, handleClose, confirm, title, text }) {
    const classes = useStyle();
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {label(title)}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ fontSize: 18 }}>
                        {label(text)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button classes={{ root: classes.button }} onClick={handleClose}>Cancelar</Button>
                    <Button classes={{ root: classes.button }} onClick={confirm} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}