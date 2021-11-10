import Searcher from "./search/Searcher";
import { FormControl } from "@mui/material";
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function AdminFilter({ setIsFinished }) {
    const [value, setValue] = useState('Ambos');

    const handleChange = (event) => {
        setValue(event.target.value);
        switch (event.target.value) {
            case 'Terminados':
                setIsFinished(true);
                break;
            case 'Pendientes':
                setIsFinished(false);
                break;
            default:
                setIsFinished('');
                break;
        }
    };

    return (
        <FormControl component="fieldset" sx={{ marginTop: '2vh' }} >
            <RadioGroup
                row
                defaultValue='Ambos'
                value={value}
                onChange={handleChange}
                label="Estado"
            >
                <FormControlLabel value='Terminados' control={<Radio />} label="Terminados" />
                <FormControlLabel value='Pendientes' control={<Radio />} label="Pendientes" />
                <FormControlLabel value='Ambos' control={<Radio />} label="Ambos" />
            </RadioGroup>
        </FormControl>
    );
}


function Administrator() {
    return (
        <Searcher AdminFilter={AdminFilter} />
    )
}

export default Administrator;