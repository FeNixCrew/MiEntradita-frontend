import { useEffect, useState } from "react";
import spectatorService from '../services/SpectatorService';
import { isUser } from "../helpers/usedFunctions";
import MatchCard from "./MatchCard";
import SnackBar from "./feedback/SnackBar";
import { useSnackbar } from '../helpers/hooks/useSnackbar'

function RenderMatchesComponent({
    ComponentToRenderWhenReturn,
    matches,
    changeTeamId = null,
    findTickets = null
}) {
    const [teamId, setTeamId] = useState(null);
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();

    useEffect(() => {
        if (isUser()) {
            const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
            setTeamId(savedTeamId);
        }
    }, []);

    const markAsFavourite = async (newTeamId) => {
        const tempTeamId = newTeamId === teamId ? null : newTeamId;
        if (newTeamId === teamId) {
            spectatorService.markAsFavourite(teamId)
                .then((_) => setSuccess(`¡Ya no tienes equipo favorito!`))
                .catch((_) => setError("Algo ha fallado al marcar a tu equipo como favorito"));

            localStorage.favouriteTeamId = null;
            setTeamId(null);
        } else {
            localStorage.favouriteTeamId = newTeamId;
            setTeamId(newTeamId);
            spectatorService.markAsFavourite(newTeamId)
                .then((response) => setSuccess(`¡Has marcado a ${response.data.name} como favorito!`))
                .catch((_) => setError("Algo ha fallado al marcar a tu equipo como favorito"));

        }

        if (changeTeamId) changeTeamId(tempTeamId);
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
        <>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <ComponentToRenderWhenReturn render={renderMatches} matches={matches} />
        </>
    );
};

export default RenderMatchesComponent;