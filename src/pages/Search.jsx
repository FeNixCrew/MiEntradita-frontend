import { useState } from "react";

import SearchBar from "../components/search/SearchBar";
import BackdropInherit from "../components/feedback/Backdrop";
import CoustomTypography from "../components/CoustomTypography";
import matchService from "../services/MatchService";
import { Paper } from "@mui/material";
import BurgerMenu from "../components/navigation/BurgerMenu";
import SnackBar from '../components/feedback/SnackBar';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import { makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";

import RenderMatchesComponent from "../components/RenderMatchesComponent";

const useStyle = makeStyles((_) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    searchBarContainer: {
        backgroundColor: '#ecf0f1',
        display: 'flex',
        borderRadius: 5,
        padding: '3vh',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2vh',
        marginTop: '5vh',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
}))


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

function Searcher() {
    const [matchs, setMatchs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [_, setError, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [partialSearch, setPartialSearch] = useState('');
    const classes = useStyle();

    const onChange = data => {
        setPartialSearch(data.textSearched);
        if (partialSearch.length > 0) {
            setIsLoading(true);
            matchService.search(partialSearch)
                .then(response => {
                    setMatchs(response.data);
                    setIsLoading(false);
                })
                .catch(__ => {
                    setError('Error al buscar. Intente de nuevo.');
                    setIsLoading(false);
                })
        } else {
            setMatchs(null);
        }
    }

    return (
        <div className={classes.root}>
            <BackdropInherit open={isLoading} />
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <div component={Paper} className={classes.searchBarContainer}>
                <SearchBar onChange={onChange} />
            </div>
            {
                matchs ?
                    <RenderMatchesComponent matches={matchs} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} callbackToComponent={() => onChange({ textSearched: partialSearch })} />
                    :
                    <CoustomTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
            }
        </div>
    );
};

export { Searcher };

export default function Search() {
    return <BurgerMenu children={<Searcher />} />
}