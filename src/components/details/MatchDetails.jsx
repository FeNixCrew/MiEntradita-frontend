import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import matchService from '../../services/MatchService.js';
import { isUser } from "../../helpers/usedFunctions";
import spectatorService from '../../services/SpectatorService';
import { BootstrapDialog } from './modal/BoostrapDialog';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import MatchDetailsContent from './MatchDetailsConten';
import Confirmation from '../Confirmation';

export default function MatchDetails({ open, handleClose, matchId, title, reserveTicket }) {
  const [matchDetails, setMatchDetails] = useState(undefined);
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const [isOpen, closeConfirmation, openConfirmation] = useToggle();
  const [error, setError] = useState(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    matchService.getMatchDetails(matchId)
      .then((response) => {
        setMatchDetails(response.data);
        return spectatorService.pendingTickets();
      })
      .then((response) => {
        return response.data.some((ticket) => ticket.matchId === matchId)
      }).then((isAvailable) => {
        setAvailable(isAvailable);
      })
      .catch((_) => {
        setError('Hubo un problema al obtener los detalles. Intente de nuevo.');
        openSnackBar();
      })
  }, [matchId, openSnackBar, setAvailable]);

  const confirm = () => {
    closeConfirmation();
    reserveTicket(matchId);
  }


  return (
    <div>
      <Confirmation open={isOpen} handleClose={closeConfirmation} confirm={confirm} title={title}/> 
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
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {matchDetails && <MatchDetailsContent matchDetails={matchDetails} />}
        </DialogContent>
        <DialogActions>
          {isUser() && <Button autoFocus onClick={openConfirmation} disabled={available}>
            Reservar Entrada
          </Button>
          }
          <Button autoFocus onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}