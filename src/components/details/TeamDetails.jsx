import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import teamService from '../../services/TeamService.js';
import { BootstrapDialog } from './modal/BoostrapDialog';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import TeamDetailsContent  from './TeamDetailsContent';
import { label } from '../../helpers/usedFunctions';

export default function TeamDetails({ open, handleClose, teamName }) {
    const [teamDetails, setTeamDetails] = useState(undefined);
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [error, setError] = useState(null);

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
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {teamDetails && <TeamDetailsContent teamDetails={teamDetails} />}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {label("Volver")}
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}