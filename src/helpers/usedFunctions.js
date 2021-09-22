export const exit = (history) => {
    localStorage.clear();
    history.push('/');
}