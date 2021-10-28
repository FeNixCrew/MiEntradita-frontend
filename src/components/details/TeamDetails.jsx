import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import teamService from '../../services/TeamService.js';
import { BootstrapDialog } from './modal/BoostrapDialog';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import TeamDetailsContent from './TeamDetailsContent';
import { isUser } from '../../helpers/usedFunctions';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function TeamDetails({ open, handleClose, teamName }) {
    const [teamDetails, setTeamDetails] = useState(undefined);
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [error, setError] = useState(null);
    const [isFav, notFav, changeFav] = useToggle(false);
    const [haveFav, setHaveFav] = useState(false);

    const mark = () => {
        let maybeFav = localStorage.getItem('favouriteTeam');
        if (maybeFav && maybeFav !== teamName) setHaveFav(true);
        if (teamName === maybeFav) {
            changeFav();
        }
    }

    useEffect(() => {
        teamService.details(teamName)
            .then((response) => {
                setTeamDetails(response.data);
            })
            .catch((_) => {
                setError('Hubo un problema al obtener los detalles. Intente de nuevo.');
                openSnackBar();
            })
    }, [teamName, openSnackBar])

    const handleClick = () => {
        // if (isFav) {
        //     notFav();
        //     localStorage.setItem('favouriteTeam', undefined)
        // } else {
        //     changeFav();
        //     localStorage.setItem('favouriteTeam', teamName)
        // }
    }

    return (
        <div>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState="error"
                message={error}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle style={{ color: 'white' }} onClose={handleClose}>
                    {teamName}
                    {isUser() && <Checkbox
                        checked={isFav}
                        disabled={haveFav}
                        style={{ display: 'inline-flex', position: 'absolute', right: 0, paddingRight: '3vh' }}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: '#c0392b' }} />}
                        onClick={handleClick} />}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {teamDetails && <TeamDetailsContent teamDetails={teamDetails} />}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Volver
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}