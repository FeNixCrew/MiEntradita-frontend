import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import matchService from '../../services/MatchService.js';
import { BootstrapDialogTitle } from './modal/BoostrapDialogTitle';
import MatchDetailsContent from './MatchDetailsContent';
import Confirmation from '../feedback/Confirmation';
import { label, isUser } from '../../helpers/usedFunctions';
import Map from '../Map';
import { Dialog, Grid } from '@mui/material';

export default function MatchDetails({ open, handleClose, matchId, title, reserveTicket, isAvailable, styleClasses, underTesting = false, ubication }) {
  const [matchDetails, setMatchDetails] = useState(undefined);
  const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
  const [isOpen, closeConfirmation, openConfirmation] = useToggle();
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(isAvailable);
  const classes = styleClasses;

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
    <>
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
      <Dialog
        onClose={handleClose}
        maxWidth='xl'
        open={open}
      >
        <BootstrapDialogTitle classes={{ root: classes.title }} onClose={handleClose}>
          {label(title)}
        </BootstrapDialogTitle>
        <DialogContent classes={{ root: classes.mainContainer }} >
          <Grid classes={{ root: classes.cardContent }}>
            {matchDetails && <MatchDetailsContent matchDetails={matchDetails} />}
          </Grid>
          <Grid item xs={4} sx={{ marginTop: '1vh' }} >
              {!underTesting && <Map className={classes.map} latitude={ubication.latitude} longitude={ubication.longitude} />}
            </Grid>
        </DialogContent>
        <DialogActions>
          {isUser() && isAvailable !== null && <Button classes={{ root: classes.button }} autoFocus onClick={openConfirmation} disabled={isDisabled}>
            Reservar Entrada
          </Button>
          }
          <Button classes={{ root: classes.button }} autoFocus onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}