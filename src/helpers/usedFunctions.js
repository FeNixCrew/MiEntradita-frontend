export const exit = (history) => {
    localStorage.clear();
    history.push('/');
}

export const isScanner = () => {
    return localStorage.getItem('role') === 'ROLE_SCANNER'
}

export const isAdmin = () => {
    return localStorage.getItem('role') === 'ROLE_ADMIN'
}

export const isLogin = () => {
    return localStorage.getItem('username') !== null
}
