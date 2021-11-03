import { Grid } from "@mui/material";
import CoustomTypography from "../CoustomTypography";
import RenderMatchesComponent from "../RenderMatchesComponent";


export const ComponentToRenderWhenReturn = ({ matches, render }) => {

    return (
        <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, auto-fit)', justifyContent: 'center' }}>
            {matches.length > 0 ?
                <div>
                    <CoustomTypography text='Resultados:' />
                    {render()}
                </div>
                :
                <CoustomTypography text='No se han encontrado partidos :(' />
            }
        </Grid>
    );
}


function SearchResults({ results }) {
    return (<RenderMatchesComponent matches={results} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn}/>);
};

export default SearchResults;