import { Container, Grid, Typography } from "@mui/material";
import BeginningTypography from "../beginning/BeginningTypography";
import SearchResult from "./SearchResult";

function SearchResults({ results }) {

    const renderResult = () => {
        return results.map((result, i) => <SearchResult key={i} match={result} />);
    };

    return (
        <Container  maxWidth="xl">
            <Grid container spacing={2}>
                {results.length > 0 ?
                    <div>
                    <BeginningTypography text ='Resultados:' />
                        {renderResult()}
                    </div>
                    :
                    <BeginningTypography text ='no se han encontrado partidos :(' />
                }
            </Grid>
        </Container>
    );
};

export default SearchResults;