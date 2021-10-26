import { useCallback, useState } from 'react';
import { useToggle } from './useToggle';

export const useSnackbar = () => {
    const [severity, setSeverity] = useState();
    const [message, setMessage] = useState();
    const [isOpenSnack, closeSnackBar, openSnackBar] = useToggle();

    const setError  = useCallback((msg) => {
        setSeverity("error");
        setMessage(msg);
        openSnackBar();
    }, [openSnackBar]);

    const setSuccess = useCallback((msg) => {
        setSeverity("success");
        setMessage(msg);
        openSnackBar();
    }, [openSnackBar]);

    return [setError, setSuccess, isOpenSnack, closeSnackBar, severity, message];
}