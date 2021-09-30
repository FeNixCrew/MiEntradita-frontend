import { Box } from "@mui/system";
import { useState } from "react";

import NavBar from "../components/navigation/NavBar";
import SearchBar from "../components/search/search_bar/SearchBar";
import * as Api from '../helpers/ApiRest';
import SearchResults from '../components/search/SearchResults';


export default function Search() {
    const [result, setResult] = useState([]);

    const onSubmit = data => {
        Api.search(data.textSearched)
            .then(response => {
                console.log(response.data);
                setResult(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <NavBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '5vh' }}>

                <SearchBar onSubmit={onSubmit} />
                <SearchResults results={result} />
            </Box>
        </div>
    );
};