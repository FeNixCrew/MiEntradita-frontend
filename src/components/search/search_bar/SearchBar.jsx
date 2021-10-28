import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

import { useForm } from 'react-hook-form';
import { Search } from './SearchComponent';
import { SearchIconWrapper } from './SearchIconWrapper';
import { StyledInputBase } from './StyledInputBase';

function SearchBar({ onChange }) {
    const { register, handleSubmit } = useForm();

    return (
        <Box component="form" onChange={handleSubmit(onChange)} noValidate>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    {...register("textSearched")}
                    style={{ fontFamily: 'Quicksand'}}
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>
    );
}

export default SearchBar;