import Avatar from '@mui/material/Avatar';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';

function CoustomAvatar() {
    return( 
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <ConfirmationNumber />
        </Avatar>
    )
}

export default CoustomAvatar;