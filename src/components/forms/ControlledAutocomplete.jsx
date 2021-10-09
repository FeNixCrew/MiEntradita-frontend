import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';


const ControlledAutocomplete = ({ options = [], renderInput, control, defaultValue, name, rules }) => {
    return (
        <Controller
            render={({ field: { onChange, ...props } }) => (
                <Autocomplete
                    freeSolo
                    options={options}
                    renderInput={renderInput}
                    onChange={(e, data) => onChange(data)}
                    {...props}
                />
            )}
            onChange={([, data]) => data}
            defaultValue={defaultValue}
            name={name}
            control={control}
            rules={rules}
        />
    );
}

export default ControlledAutocomplete;