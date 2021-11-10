import { useEffect, useState } from "react";

import SearchBar from "../components/search/SearchBar";
import BackdropInherit from "../components/feedback/Backdrop";
import CoustomTypography from "../components/CoustomTypography";
import matchService from "../services/MatchService";
import { FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import BurgerMenu from "../components/navigation/BurgerMenu";
import SnackBar from '../components/feedback/SnackBar';
import { useSnackbar } from '../helpers/hooks/useSnackbar';
import { isAdmin } from '../helpers/usedFunctions';
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
    const [partialSearch, setPartialSearch] = useState(null);
    const classes = useStyle();
    const [isFinished, setIsFinished] = useState('null');

    useEffect(() =>{
        if (partialSearch?.length >= 0) {
            setIsLoading(true);
            matchService.search(partialSearch, isFinished)
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
    },[isFinished, partialSearch, setError]);

    const onChangeSearch = data => {
        setPartialSearch(data.textSearched);
    }

    const onChangeIsFinished = (event) => {
        setIsFinished(event.target.value);
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
                <SearchBar onChange={onChangeSearch} />
                { isAdmin() &&
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                        value={isFinished}
                        onChange={onChangeIsFinished}
                        label="Estado"
                        >
                            <MenuItem value={true}>Terminados</MenuItem>
                            <MenuItem value={false}>Pendientes</MenuItem>
                            <MenuItem value={'null'}>Ambos</MenuItem>
                        </Select>
                    </FormControl>
                }
            </div>
            {
                matchs ?
                    <RenderMatchesComponent matches={matchs} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} callbackToComponent={() => onChangeSearch({ textSearched: partialSearch })} />
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