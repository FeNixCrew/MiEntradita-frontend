import { Container, Grid, Typography } from "@mui/material";
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
                        <Typography variant='h6' component='div' sx={{m:5}}>Resultados:</Typography>
                        {renderResult()}
                    </div>
                    :
                    <Typography variant='h6' component='div' sx={{m:6}}>Sin resultados</Typography>
                }
            </Grid>
        </Container>
    );
};

export default SearchResults;