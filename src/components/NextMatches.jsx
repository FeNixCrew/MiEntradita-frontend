import { Container, Grid } from "@mui/material";
import React from 'react';
import CoustomTypography from './CoustomTypography';
import MatchCard from "./MatchCard";

const ComponentToRenderWhenReturn = ({ matches, render }) => {
    return (
        <div>
            {
            matches.length > 0 ?
                <Container sx={{ py: '7vh' }} maxWidth="lg">
                    <Grid container spacing={1}>
                        {render()}
                    </Grid>
                </Container>
                :
                <CoustomTypography
                    text='!Tu equipo aún no tiene nuevos partidos programados!'
                    sx={{ textAlign: 'center' }}
                />
            }
        </div>
    )
}

function NextMatches({ markAsFavourite, haveFavourite, teamId, nextMatches, findTickets }) {

    const renderMatches = () => {
        return nextMatches.map((match, i) =>
            <MatchCard
                key={i}
                match={match}
                teamId={teamId}
                markAsFavourite={markAsFavourite}
                haveFavouriteTeam={haveFavourite}
                findTickets={findTickets}
            />
        )
    }

    return (
        <div>
            {
                teamId === null || nextMatches === null ?
                    <CoustomTypography
                        text='!Aun no tienes equipo favorito!'
                        sx={{ textAlign: 'center' }}
                    />
                    :
                    <ComponentToRenderWhenReturn 
                    render={renderMatches} 
                    matches={nextMatches} 
                    />
            }

        </div>
    );
}

export default NextMatches;