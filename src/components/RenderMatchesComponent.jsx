import { useEffect, useState } from "react";
import spectatorService from '../services/SpectatorService';
import { isUser } from "../helpers/usedFunctions";
import MatchCard from "./MatchCard";
import SnackBar from "./feedback/SnackBar";
import { useSnackbar } from '../helpers/hooks/useSnackbar'

function RenderMatchesComponent({
    ComponentToRenderWhenReturn,
    matches,
    findTickets = null,
    findMatches = null
}) {
    const [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [teamId, setTeamId] = useState(null);

    useEffect(() => {
        if (isUser()) {
            spectatorService.getFavouriteTeam()
            .then(response => {
                setTeamId(response.data.id || null);
            })
            .catch((_) => {
                setError('Hubo un error al obtener tu equipo favorito, intente de nuevo.');
            });
        }
    }, [teamId, setError]);

    const markAsFavourite = async (newTeamId) => {
        spectatorService.markAsFavourite(newTeamId)
            .then((response) => response.data ? response.data : null)
            .then((maybeTeam) => {
                if (maybeTeam) setSuccess(`¡Has marcado a ${maybeTeam.name} como favorito!`); 
                else setSuccess('¡Ya no tienes equipo favorito!');

                setTeamId(maybeTeam?.id || null);
                if(findMatches) findMatches();
            })
            .catch((_) => {
                setError("Algo ha fallado al marcar o desmarcar al equipo.")
            }); 
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