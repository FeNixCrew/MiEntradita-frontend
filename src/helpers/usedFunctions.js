export const exit = (history) => {
    localStorage.clear();
    history.push('/');
}

export const isScanner = () => {
    return localStorage.getItem('role') === 'SCANNER'
}

export const isAdmin = () => {
    return localStorage.getItem('role') === 'ADMIN'
}

export const isLogin = () => {
    return localStorage.getItem('username') !== null
}
