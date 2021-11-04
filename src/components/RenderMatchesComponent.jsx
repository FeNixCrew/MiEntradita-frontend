import { useEffect, useState } from "react";
import spectatorService from '../services/SpectatorService'
import { isUser } from "../helpers/usedFunctions";
import MatchCard from "./MatchCard";

function RenderMatchesComponent({ 
    ComponentToRenderWhenReturn, 
    matches,
    changeTeamId = null,
    findTickets = null
}) {
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        if (isUser()) {
            const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
            setTeamId(savedTeamId);
        }
    }, []);

    const markAsFavourite = (newTeamId) => {
        const tempTeamId = newTeamId === teamId ? null : newTeamId;
        if (newTeamId === teamId) {
            spectatorService.markAsFavourite(teamId);
            localStorage.favouriteTeamId = null;
            setTeamId(null);
        } else {
            localStorage.favouriteTeamId = newTeamId;
            setTeamId(newTeamId);
            spectatorService.markAsFavourite(newTeamId);
        }

        if(changeTeamId) changeTeamId(tempTeamId);
    }

    const haveFavouriteTeam = () => {
        return teamId !== null;
    }

    const renderMatches = () => {
        return matches.map((match, i) =>
            <MatchCard
                key={i}
                match={match}
                teamId={teamId}
                markAsFavourite={markAsFavourite}
                haveFavouriteTeam={haveFavouriteTeam}
                findTickets={findTickets}
            />
        )
    }

    return (
        <ComponentToRenderWhenReturn render={renderMatches} matches={matches} />
    );
};

export default RenderMatchesComponent;