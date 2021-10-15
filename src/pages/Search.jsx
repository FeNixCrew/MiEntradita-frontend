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
        if (partialSearch.length > 2) {
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
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <BackdropInherit open={isLoading} />
                <SnackBar
                    openSnackBar={isOpenSnack}
                    severityState="error"
                    message={error}
                    closeSnackBar={closeSnackBar}
                    position={{ vertical: 'bottom', horizontal: 'left' }}
                />
                <Paper elevation={4} square style={{ marginTop: '5vh', padding: '3vh', backgroundColor: '#d7dbdd', borderRadius: 4 }}>
                    <Box sx={{
                        display: 'grid',
                        justifyContent: 'center',
                        gridTemplateColumns: 'repeat(auto-fit, auto-fit)',
                    }}>
                        <SearchBar onChange={onChange} />
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        justifyContent: 'center',
                    }}>
                        {
                            matchs ?
                                <SearchResults results={matchs} />
                                :
                                <BeginningTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
                        }
                    </Box>
                </Paper>
            </div>
        </>
    );
};

export { Searcher };

export default function Search() {
    return <BurgerMenu children={<Searcher />} />
}