import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import spectatorService from '../services/SpectatorService';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import SnackBar from '../components/feedback/SnackBar';
import RenderMatchesComponent from "./RenderMatchesComponent";
import React from 'react';
import CoustomTypography from './CoustomTypography';

const ComponentToRenderWhenReturn = ({ matches, render }) => {
    return (
        <>
            {
                matches === null ?
                    <CoustomTypography
                        text='!Aun no tienes equipo favorito!'
                        sx={{ textAlign: 'center' }}
                    />
                    :
                    (matches.length > 0 ?
                        <Container sx={{ py: '7vh' }} maxWidth="lg">
                            <Grid container spacing={1}>
                                {render()}
                            </Grid>
                        </Container>
                        :
                        <CoustomTypography
                            text='!Tu equipo favorito no tiene proximos partidos!'
                            sx={{ textAlign: 'center' }}
                        />
                    )
            }
        </>
    )
}

function NextMatches({ closeBackdrop }) {
    const [nextMatches, setNextMatches] = useState(null);
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();

    useEffect(() => {
        spectatorService.nextMatches()
            .then((response) => {
                if (response.data) setNextMatches(response.data);
                
                closeBackdrop();
            })
            .catch((error) => {
                setError('Hubo un error al obtener los proximos partidos de tu equipo favorito, por favor, intente de nuevo.');
                closeBackdrop();
            })
    }, [])

    return (
        <>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <RenderMatchesComponent matches={nextMatches} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} />
        </>
    );
}

export default NextMatches;