import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import matchService from '../../services/MatchService.js';
import { BootstrapDialog } from './modal/BoostrapDialog';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import MatchDetailsContent from './MatchDetailsContent';
import Confirmation from '../feedback/Confirmation';
import { label, isUser } from '../../helpers/usedFunctions';

export default function MatchDetails({ open, handleClose, matchId, title, reserveTicket, isAvailable }) {
  const [matchDetails, setMatchDetails] = useState(undefined);
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const [isOpen, closeConfirmation, openConfirmation] = useToggle();
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(isAvailable);

  useEffect(() => {
    matchService.getMatchDetails(matchId)
      .then((response) => {
        setMatchDetails(response.data);
        if (response.data.availableTickets === 0) {
          setIsDisabled(true);
        }
      })
      .catch((_) => {
        setError('Hubo un problema al obtener los detalles. Intente de nuevo.');
        openSnackBar();
      })
  }, [matchId, openSnackBar]);

  const confirm = () => {
    closeConfirmation();
    reserveTicket(matchId);
  }

  return (
    <div>
      <Confirmation
        open={isOpen}
        handleClose={closeConfirmation}
        confirm={confirm}
        title={title}
        text="Esta seguro que desea reservar una entrada para este partido?"
      />
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
          {label(title)}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {matchDetails && <MatchDetailsContent matchDetails={matchDetails} />}
        </DialogContent>
        <DialogActions>
          {isUser() && isAvailable !== null && <Button sx={{ color: '#2e86c1' }} autoFocus onClick={openConfirmation} disabled={isDisabled}>
            Reservar Entrada
          </Button>
          }
          <Button sx={{ color: '#2e86c1' }} autoFocus onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}