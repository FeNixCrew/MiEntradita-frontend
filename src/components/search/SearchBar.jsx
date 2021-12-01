import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

import { Search } from './search_bar/SearchComponent';
import { SearchIconWrapper } from './search_bar/SearchIconWrapper';
import { StyledInputBase } from './search_bar/StyledInputBase';

function SearchBar({ onChange, register, handleSubmit, type = 'text'}) {
    return (
        <Box component="form" onChange={handleSubmit(onChange)} onSubmit={handleSubmit(onChange)} noValidate>
            <Search sx={{ maxWidth: '75vw' }}>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    {...register("textSearched")}
                    style={{ fontFamily: 'Quicksand', color: 'black', fontWeight: 'bold'}}
                    placeholder="Buscar..."
                    type={type} 
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>
    );
}

export default SearchBar;