export const exit = (history) => {
    localStorage.clear();
    history.push('/');
}

export const isScanner = () => {
    return localStorage.getItem('username') === 'scanner'
}

export const isLogin = () => {
    return localStorage.getItem('username') !== null
}
