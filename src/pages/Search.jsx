import { Box } from "@mui/system";
import { useState } from "react";

import NavBar from "../components/navigation/NavBar";
import SearchBar from "../components/search/search_bar/SearchBar";
import SearchResults from '../components/search/SearchResults';
import BackdropInherit from "../components/feedback/Backdrop";
import BeginningTypography from "../components/beginning/BeginningTypography";
import matchService from "../services/MatchService";
import { Paper } from "@mui/material";


export default function Search() {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = data => {
        setIsLoading(true);
        matchService.search(data.textSearched)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const partialSearch = (text) => {
        if(text.length < 3) return;
        setIsLoading(true);
        matchService.search(text)
            .then(response => {
                setResult(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <NavBar />
            <BackdropInherit open={isLoading} />
            <Paper elevation={4} square sx={{ m:4, p:4, backgroundColor: '#d7dbdd', borderRadius: 4 }}>
                <Box sx={{
                    display: 'grid',
                    justifyContent: 'center',
                    gridTemplateColumns: 'repeat(auto-fit, auto-fit)',
                }}>
                    <SearchBar onSubmit={onSubmit} partialSearch={partialSearch} />
                </Box>
                <Box sx={{
                    display: 'grid',
                    justifyContent: 'center',
                }}>
                    {
                        result ?
                            <SearchResults results={result} />
                            :
                            <BeginningTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
                    }
                </Box>
            </Paper>
        </div>
    );
};