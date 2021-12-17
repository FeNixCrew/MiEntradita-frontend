import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core';


export const BootstrapDialogTitle = (props) => {
    const { children, _, ...other } = props;
    const style = makeStyles((_) => ({ root: { m: 0, p: 2, backgroundColor: '#2e86c1' }}))
    const classes = style()

    return (
        <DialogTitle classes={{ root: classes.root }} {...other}>
            {children}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};