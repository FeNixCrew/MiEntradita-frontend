import { useCallback, useState } from 'react';

export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const close = () => setState(false)

    const toggle = useCallback(() => setState(state => !state), []);

    return [state, close, toggle]
}