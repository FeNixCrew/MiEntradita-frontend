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
    const [matchs, setMatchs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = data => {
        const partialSearch = data.textSearched;
        if (partialSearch.length > 0) {
            setIsLoading(true);
            matchService.search(partialSearch)
                .then(response => {
                    setMatchs(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            setMatchs(null);
        }
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
    );
};