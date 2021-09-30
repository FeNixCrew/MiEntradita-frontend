import { Box } from "@mui/system";


function SearchResults({ results }) {

    const renderResult = () => {
        return results.map((result, i) => <h5 key={i}>{`${result.home} vs ${result.away}`}</h5>);
    };

    return (
        <Box>
            {results.length > 0 ?
                <div>
                    <h4>Resultados:</h4>
                    {renderResult()}
                </div>
                :
                <h6>No hay resultados</h6>
            }
        </Box>
    );
};

export default SearchResults;