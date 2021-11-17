import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SnackBar from '../feedback/SnackBar';
import { useToggle } from '../../helpers/hooks/useToggle'
import matchService from '../../services/MatchService.js';
import MatchDetailsContent from './MatchDetailsContent';
import Confirmation from '../feedback/Confirmation';
import { isUser } from '../../helpers/usedFunctions';
import Map from '../Map';
import { Grid } from '@mui/material';
import spectatorService from '../../services/SpectatorService';
import { useSnackbar } from '../../helpers/hooks/useSnackbar';
import { useLocation } from 'react-router';
import BurgerMenu from '../navigation/BurgerMenu';
import { isMobile } from 'react-device-detect';
import { useStylesDesktop, useStylesMobile } from './styles';



function MatchDetailsComponent({ matchId, matchTitle, isAvailable, ubication }) {
    const desktopClasses = useStylesDesktop();
    const mobileClasses = useStylesMobile();
    const [matchDetails, setMatchDetails] = useState(undefined);
    const [isOpen, closeConfirmation, openConfirmation] = useToggle();
    const [isDisabled, setIsDisabled] = useState(isAvailable);
    const classes = isMobile ? mobileClasses : desktopClasses;
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

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
            })
    }, [matchId, setError]);

    const confirm = () => {
        closeConfirmation();
        reserveTicket(matchId);
    }

    const reserveTicket = (matchId) => {
        spectatorService.reserveTicket(matchId)
            .then((_) => {
                setSuccess("Entrada reservada");
                matchDetails.isReserved = true;
                setIsDisabled(true);
            })
            .catch((error) => {
                const response = error.response;
                setError(response.data.message);
            })
    }

    return (
        <div>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <Confirmation
                open={isOpen}
                handleClose={closeConfirmation}
                confirm={confirm}
                title={matchTitle}
                text="Esta seguro que desea reservar una entrada para este partido?"
            />
            <Grid className={classes.cardContent}>
                {matchDetails && <MatchDetailsContent matchDetails={matchDetails} />}
                <Grid item xs={4} sx={{ marginTop: '2vh' }}>
                    <Map className={classes.map} latitude={ubication.latitude} longitude={ubication.longitude} />
                </Grid>
            </Grid>

            {isUser() && isAvailable !== null && <Button sx={{ color: '#2e86c1' }} autoFocus onClick={openConfirmation} disabled={isDisabled}>
                Reservar Entrada
            </Button>
            }
        </div>
    );
}


export default function MatchDetails2() {
    const { matchId, isAvailable, ubication, matchTitle } = useLocation().state

    return (
        <BurgerMenu
            children={
                <MatchDetailsComponent
                    matchId={matchId}
                    isAvailable={isAvailable}
                    ubication={ubication}
                    matchTitle={matchTitle}
                />
            }
        />
    )
}