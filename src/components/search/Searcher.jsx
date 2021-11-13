import { useEffect, useState, useCallback } from "react";

import SearchBar from "./SearchBar";
import BackdropInherit from "../feedback/Backdrop";
import CoustomTypography from "../CoustomTypography";
import matchService from "../../services/MatchService";
import { Paper } from "@mui/material";
import SnackBar from '../feedback/SnackBar';
import { useSnackbar } from '../../helpers/hooks/useSnackbar';
import { isAdmin } from '../../helpers/usedFunctions';
import { makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useForm } from 'react-hook-form';

import RenderMatchesComponent from "../RenderMatchesComponent";
import Filter from './Filter';

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
    const [setError, _, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [partialSearch, setPartialSearch] = useState(null);
    const [isFinished, setIsFinished] = useState('');
    const [value, setValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [matchs, setMatchs] = useState(null);
    const classes = useStyle();
    const { register, handleSubmit } = useForm();


    const do_search = useCallback(async () => {
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
    }, [isFinished, partialSearch, setError])

    useEffect(() => {
        do_search();
    }, [do_search]);

    const onChangeSearch = data => {
        setPartialSearch(data.textSearched);

        if (value === null) setValue('Ambos');
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
                <SearchBar onChange={onChangeSearch} register={register} handleSubmit={handleSubmit} />
                {isAdmin() &&
                    <Filter
                        setPartialSearch={setPartialSearch}
                        setIsFinished={setIsFinished}
                        setValue={setValue}
                        partialSearch={partialSearch}
                        value={value}
                    />}
            </div>
            {
                matchs ?
                    <RenderMatchesComponent matches={matchs} ComponentToRenderWhenReturn={ComponentToRenderWhenReturn} callbackToComponent={do_search} />
                    :
                    <CoustomTypography text='Busque partidos de un equipo!' sx={{ mt: 4 }} />
            }
        </div>
    );
};

export default Searcher;