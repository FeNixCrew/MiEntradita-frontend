import { Box } from "@mui/system";
import { useState } from "react";

import NavBar from "../components/navigation/NavBar";
import SearchBar from "../components/search/search_bar/SearchBar";
import SearchResults from '../components/search/SearchResults';
import BackdropInherit from "../components/feedback/Backdrop";
import BeginningTypography from "../components/beginning/BeginningTypography";
import matchService from "../services/MatchService";


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

    return (
        <div>
            <NavBar />
            <BackdropInherit open={isLoading}/>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 5
            }}>
                <SearchBar onSubmit={onSubmit} />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 200vh)' }}>
                {
                result ?
                    <SearchResults results={result} />
                    :
                    <BeginningTypography text ='Busque partidos de un equipo!' />
                }
            </Box>
        </div>
    );
};