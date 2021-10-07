import { Grid } from "@mui/material";
import BeginningTypography from "../BeginningTypography";
import SearchResult from "./SearchResult";

function SearchResults({ results }) {

    const renderResult = () => {
        return results.map((result, i) => <SearchResult key={i} match={result} />);
    };

    return (
        <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {results.length > 0 ?
                <div>
                    <BeginningTypography text='Resultados:' />
                    {renderResult()}
                </div>
                :
                <BeginningTypography text='no se han encontrado partidos :(' />
            }
        </Grid>
    );
};

export default SearchResults;