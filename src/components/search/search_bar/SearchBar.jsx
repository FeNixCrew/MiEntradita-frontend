import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

import { useForm } from 'react-hook-form';
import { Search } from './SearchComponent';
import { SearchIconWrapper } from './SearchIconWrapper';
import { StyledInputBase } from './StyledInputBase';

function SearchBar({ onSubmit, partialSearch }) {
    const { register, handleSubmit } = useForm();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    {...register("textSearched")}
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>
    );
}

export default SearchBar;