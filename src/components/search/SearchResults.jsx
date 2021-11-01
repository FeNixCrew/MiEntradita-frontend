import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CoustomTypography from "../CoustomTypography";
import SearchResult from "./SearchResult";
import spectatorService from '../../services/SpectatorService'
import { isUser } from "../../helpers/usedFunctions";

function SearchResults({ results }) {
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        if (isUser()) {
            const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
            setTeamId(savedTeamId);
        }
    }, []);

    const markAsFavourite = (newTeamId) => {
        if (newTeamId === teamId) {
            spectatorService.markAsFavourite(teamId);
            localStorage.favouriteTeamId = null;
            setTeamId(null);
        } else {
            localStorage.favouriteTeamId = newTeamId;
            setTeamId(newTeamId);
            spectatorService.markAsFavourite(newTeamId);
        }
    }

    const haveFavouriteTeam = () => {
        return teamId !== null;
    }


    const renderResult = () => {
        return results.map((result, i) =>
            <SearchResult
                key={i}
                match={result}
                teamId={teamId}
                markAsFavourite={markAsFavourite}
                haveFavouriteTeam={haveFavouriteTeam}
            />
        );
    };

    return (
        <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {results.length > 0 ?
                <div>
                    <CoustomTypography text='Resultados:' />
                    {renderResult()}
                </div>
                :
                <CoustomTypography text='No se han encontrado partidos :(' />
            }
        </Grid>
    );
};

export default SearchResults;