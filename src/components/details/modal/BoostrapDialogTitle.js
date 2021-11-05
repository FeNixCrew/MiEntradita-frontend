import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';


export const BootstrapDialogTitle = (props) => {
    const { children, _, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#2e86c1' }} {...other}>
            {children}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};