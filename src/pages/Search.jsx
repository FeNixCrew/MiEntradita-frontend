import { useEffect, useState } from "react";

import SearchBar from "../components/search/search_bar/SearchBar";
import SearchResults from '../components/search/SearchResults';
import BackdropInherit from "../components/feedback/Backdrop";
import CoustomTypography from "../components/CoustomTypography";
import matchService from "../services/MatchService";
import { Paper } from "@mui/material";
import BurgerMenu from "../components/navigation/BurgerMenu";
import SnackBar from '../components/feedback/SnackBar';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import { isUser } from '../helpers/usedFunctions';
import { makeStyles } from "@material-ui/core";
import spectatorService from '../services/SpectatorService'

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    searchBarContainer: {
        backgroundColor: '#ecf0f1',
        display: 'flex',
        borderRadius: 5,
        padding: '3vh',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2vh',
        marginTop: '5vh',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
}))

function Searcher() {
    const [matchs, setMatchs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setError, isOpenSnack, closeSnackBar, severity, message } = useSnackbar();
    const [teamId, setTeamId] = useState(null);
    const classes = useStyle();

    useEffect(()=> {
        if(isUser()){
            const savedTeamId = parseInt(localStorage.favouriteTeamId) || null;
            setTeamId(savedTeamId);
        }
    }, []);

    const onChangeTeam = (newTeamId) => {
        setTeamId(newTeamId);
        localStorage.favouriteTeamId = newTeamId;
        spectatorService.markAsFavourite(newTeamId);
        
    }

    const onChange = data => {
        const partialSearch = data.textSearched;
        if (partialSearch.length > 0) {
            setIsLoading(true);
            matchService.search(partialSearch)
                .then(response => {
                    setMatchs(response.data);
                    setIsLoading(false);
                })
                .catch(__ => {
                    setError('Error al buscar. Intente de nuevo.');
                    setIsLoading(false);
                })
        } else {
            setMatchs(null);
        }
    }

    return (
        <div className={classes.root}>
            <BackdropInherit open={isLoading} />
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <div component={Paper} className={classes.searchBarContainer}>
                <SearchBar onChange={onChange} />
            </div>
            {
                matchs ?
                    <SearchResults results={matchs} teamId={teamId} onChangeTeam={onChangeTeam} />
                    :
                    <CoustomTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
            }
        </div>
    );
};

export { Searcher };

export default function Search() {
    return <BurgerMenu children={<Searcher />} />
}