import { Container, Grid } from "@mui/material";
import { useState, useEffect } from 'react';
import CoustomTypography from './CoustomTypography';
import RenderMatchesComponent from "./RenderMatchesComponent";
import { Typography, makeStyles } from '@material-ui/core';
import SnackBar from '../components/feedback/SnackBar';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import spectatorService from '../services/SpectatorService';

const useStyle = makeStyles((theme) => ({
    text: {
        fontFamily: 'Quicksand',
        textAlign: 'center',
        fontWeight: 'bolder',
        letterSpacing: 3
    }
}))

const ComponentToRenderWhenReturn = ({ matches, render }) => {
    const classes = useStyle();

    return (
        <div>
            {
            matches?.length > 0 ?
                <Container sx={{ py: '7vh' }} maxWidth="lg">
                    <Typography
                        className={classes.text}
                        variant="h5"
                    >
                        ¡Próximos encuentros de tu equipo favorito!
                    </Typography>
                    <Grid container spacing={1}>
                        {render()}
                    </Grid>
                </Container>
                : matches?.length === 0 ?
                    <CoustomTypography
                        text='!Tu equipo aún no tiene nuevos partidos programados!'
                        sx={{ textAlign: 'center' }}
                    />
                    :
                    <CoustomTypography
                        text='!No tienes un equipo favorito!'
                        sx={{ textAlign: 'center' }}
                    />

            }
        </div>
    )
}

function NextMatches({ handleClose, findTickets }) {
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();
    const [nextMatches, setNextMatches] = useState(null);
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
        setTeamId(savedTeamId);
        spectatorService.nextMatches()
            .then((response) => {
                if (response.data) setNextMatches(response.data);
                handleClose();
            })
            .catch((_) => {
                setError('Hubo un error al obtener los proximos partidos de tu equipo favorito, por favor, intente de nuevo.');
                handleClose();
            })
    }, [teamId]);

    const changeTeamId = (newTeamId) => {
        if(newTeamId) {
            setTeamId(newTeamId);
        } else {
            setTeamId(null);
            setNextMatches(null);
        }
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
            <RenderMatchesComponent 
                matches={nextMatches} 
                ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} 
                findTickets={findTickets}
                changeTeamId={changeTeamId}
            />
        </div>
    );
}

export default NextMatches;