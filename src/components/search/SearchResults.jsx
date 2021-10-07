import { Grid } from "@mui/material";
import BeginningTypography from "../BeginningTypography";
import SearchResult from "./SearchResult";

function SearchResults({ results }) {

    const renderResult = () => {
        return results.map((result, i) => <SearchResult key={i} match={result} />);
    };

    return (
        <Grid container sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {results.length > 0 ?
                <div>
                    <BeginningTypography text='Resultados:' sx={{ mt: 4 }} />
                    {renderResult()}
                </div>
                :
                <BeginningTypography text='no se han encontrado partidos :(' sx={{ mt: 3 }} />
            }
        </Grid>
    );
};

export default SearchResults;