import { useState } from "react";

import SearchBar from "../components/search/search_bar/SearchBar";
import SearchResults from '../components/search/SearchResults';
import BackdropInherit from "../components/feedback/Backdrop";
import CoustomTypography from "../components/CoustomTypography";
import matchService from "../services/MatchService";
import { Paper } from "@mui/material";
import BurgerMenu from "../components/navigation/BurgerMenu";
import SnackBar from '../components/feedback/SnackBar';
import { useToggle } from '../helpers/hooks/useToggle';

function Searcher() {
    const [matchs, setMatchs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();
    const [error, setError] = useState(null);


    const onChange = data => {
        const partialSearch = data.textSearched;
        if (partialSearch.length > 0) {
            setIsLoading(true);
            matchService.search(partialSearch)
                .then(response => {
                    setMatchs(response.data);
                    setIsLoading(false);
                })
                .catch(_ => {
                    setError('Error al buscar. Intente de nuevo.');
                    openSnackBar();
                    setIsLoading(false);
                })
        } else {
            setMatchs(null);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BackdropInherit open={isLoading} />
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState="error"
                message={error}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <div component={Paper} style={{
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
            }}>
                <SearchBar onChange={onChange} />
            </div>
            {
                matchs ?
                    <SearchResults results={matchs} />
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