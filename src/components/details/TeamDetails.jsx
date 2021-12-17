import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import teamService from '../../services/TeamService.js';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import TeamDetailsContent from './TeamDetailsContent';
import { isUser } from '../../helpers/usedFunctions';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Confirmation from '../feedback/Confirmation';
import { useSnackbar } from '../../helpers/hooks/useSnackbar'
import { Dialog } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((_) => ({
    title: {
        color: 'white',
        backgroundColor: '#2e86c1',
        fontFamily: 'Quicksand'
    },
    checkbox: {
        display: 'inline-flex',
        position: 'absolute',
        right: 0,
        paddingRight: '3vh'
    },
    button: {
        color: '#2e86c1',
        fontFamily: 'Quicksand',
        fontSize: 15
    }
}))



export default function TeamDetails({ open, handleClose, teamName, teamId, markAsFavourite, haveFavouriteTeam }) {
    const [teamDetails, setTeamDetails] = useState(undefined);
    const [_, setError, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOpen, closeConfirmation, openConfirmation] = useToggle();
    const classes = useStyle();

    useEffect(() => {
        teamService.details(teamName)
            .then((response) => {
                setTeamDetails(response.data);
                setIsFavorite(response.data.id === teamId);
            })
            .catch((err) => {
                console.log(err.message);
                setError('Hubo un problema al obtener los detalles. Intente de nuevo.');
            })
    }, [teamName, setError, teamId]);

    const handleClick = (_) => {
        if (!isFavorite && haveFavouriteTeam()) {
            openConfirmation();
        } else {
            setIsFavorite(!isFavorite)
            markAsFavourite(teamDetails.id);
            handleClose();
        }

    }

    const handleConfirmation = () => {
        closeConfirmation();
        setIsFavorite(!isFavorite);
        markAsFavourite(teamDetails.id);
        handleClose();
    }

    return (
        <div>
            <Confirmation
                open={isOpen}
                handleClose={closeConfirmation}
                confirm={handleConfirmation}
                title="Equipo favorito"
                text="Esta seguro que desea cambiar su equipo favorito?"
            />
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                {
                    teamDetails &&
                    <BootstrapDialogTitle classes={{ root: classes.title }} onClose={handleClose}>
                        {teamDetails.name}
                        {isUser() && <Checkbox
                            checked={isFavorite}
                            classes={{ root: classes.checkbox }}
                            style={{
                                display: 'inline-flex',
                                position: 'absolute',
                                right: 0,
                                paddingRight: '3vh'
                            }}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: '#c0392b' }} />}
                            onClick={handleClick} />}
                    </BootstrapDialogTitle>
                }
                <DialogContent dividers>
                    {teamDetails && <TeamDetailsContent teamDetails={teamDetails} />}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} classes={{ root: classes.button }}>
                        Volver
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}