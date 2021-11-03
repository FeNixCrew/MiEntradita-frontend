import { useEffect, useState } from "react";
import spectatorService from '../services/SpectatorService'
import { isUser } from "../helpers/usedFunctions";
import SearchResult from "./search/SearchResult";

function RenderMatchesComponent({ ComponentToRenderWhenReturn, matches }) {
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

    const renderMatches = () => {
        return matches.map((match, i) =>
            <SearchResult
                key={i}
                match={match}
                teamId={teamId}
                markAsFavourite={markAsFavourite}
                haveFavouriteTeam={haveFavouriteTeam}
            />
        )
    }


    return (
        <ComponentToRenderWhenReturn render={renderMatches} matches={matches} />
    );
};

export default RenderMatchesComponent;