import { Box } from "@mui/system";
import { useState } from "react";

import SearchBar from "../components/search/search_bar/SearchBar";
import SearchResults from '../components/search/SearchResults';
import BackdropInherit from "../components/feedback/Backdrop";
import BeginningTypography from "../components/BeginningTypography";
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
            <Paper sx={{ marginTop: '5vh', marginLeft: 'auto', marginRight: 'auto', padding: '3vh', borderRadius: 2 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <SearchBar onChange={onChange} />
                </Box>
            </Paper>
            {
                matchs ?
                    <SearchResults results={matchs} />
                    :
                    <BeginningTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
            }
        </div>
    );
};

export { Searcher };

export default function Search() {
    return <BurgerMenu children={<Searcher />} />
}