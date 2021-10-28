import { Grid } from "@mui/material";
import CoustomTypography from "../CoustomTypography";
import SearchResult from "./SearchResult";

function SearchResults({ results, teamId, onChangeTeam }) {

    const renderResult = () => {
        return results.map((result, i) => <SearchResult key={i} match={result} teamId={teamId} onChangeTeam={onChangeTeam} />);
    };

    return (
        <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {results.length > 0 ?
                <div>
                    <CoustomTypography text='Resultados:' />
                    {renderResult()}
                </div>
                :
                <CoustomTypography text='No se han encontrado partidos :(' />
            }
        </Grid>
    );
};

export default SearchResults;