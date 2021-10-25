import { Grid, Container } from "@mui/material";
import CoustomTypography from "../CoustomTypography";
import SearchResult from "./SearchResult";

function SearchResults({ results }) {

    const renderResult = () => {
        return results.map((result, i) => <SearchResult key={i} match={result} />);
    };

    return (
        <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {results.length > 0 ?
                <div>
                    <CoustomTypography text='Resultados:' />
                    <Container sx={{ py: 4 }} maxWidth="lg">
                        <Grid container spacing={4}>
                            {renderResult()}
                        </Grid>
                    </Container>
                </div>
                :
                <CoustomTypography text='No se han encontrado partidos :(' />
            }
        </Grid>
    );
};

export default SearchResults;