import { FormControl, Typography } from "@mui/material";
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((_) => ({
    label: {
        fontSize: 17, 
        fontFamily: 'Quicksand',
        fontWeightRegular: 550,
        fontWeightBold: 900
    }
}))


function Filter({ partialSearch, setPartialSearch, setIsFinished }) {
    const [value, setValue] = useState('');
    const classes = useStyle();

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
        if(partialSearch === null) setPartialSearch('');
    };

    return (
        <FormControl component="fieldset" style={{ marginTop: '2vh' }} >
            <RadioGroup
                row
                defaultValue='Ambos'
                value={value}
                onChange={handleChange}
                label="Estado"
            >
                <FormControlLabel 
                    value='Terminados' 
                    control={<Radio />} 
                    label={<Typography className={classes.label}> Terminados </Typography>} 
                />
                <FormControlLabel 
                    value='Pendientes' 
                    control={<Radio />} 
                    label={<Typography className={classes.label}> Pendientes </Typography>} 
                />
                <FormControlLabel 
                    value='Ambos' 
                    control={<Radio />} 
                    label={<Typography className={classes.label}> Ambos </Typography>} 
                />
            </RadioGroup>
        </FormControl>
    );
}

export default Filter;