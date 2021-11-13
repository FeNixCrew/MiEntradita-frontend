import { FormControl, Typography } from "@mui/material";
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


function Filter({ 
    partialSearch, 
    setPartialSearch, 
    setIsFinished,
    value,
    setValue
}) {
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
        if (partialSearch === null) setPartialSearch('');
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
                {['Terminados', 'Pendientes', 'Ambos'].map((option) =>
                    <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={<Typography className={classes.label}> {option} </Typography>}
                    />
                )}
            </RadioGroup>
        </FormControl>
    );
}

export default Filter;