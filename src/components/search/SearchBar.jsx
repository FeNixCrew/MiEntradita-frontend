import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

import { useForm } from 'react-hook-form';
import { Search } from './search_bar/SearchComponent';
import { SearchIconWrapper } from './search_bar/SearchIconWrapper';
import { StyledInputBase } from './search_bar/StyledInputBase';

function SearchBar({ onChange, type = 'text' }) {
    const { register, handleSubmit } = useForm();

    return (
        <Box component="form" onChange={handleSubmit(onChange)} onSubmit={handleSubmit(onChange)} noValidate>
            <Search sx={{ maxWidth: '28vw' }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    {...register("textSearched")}
                    style={{ fontFamily: 'Quicksand'}}
                    placeholder="Buscar..."
                    type={type}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>
    );
}

export default SearchBar;