import axios from 'axios';


const url = 'http://localhost:8081/api/spectator'


export const login = async (username, password) => {
    const endpoint = '/login';
    const data = {
        username: username,
        password: password
    }
    return axios.post(url + endpoint, data);
}

export const me = async () => {
    const endpoint = '/tickets';
    const spectatorId = localStorage.getItem('spectatorId');
    const params = new URLSearchParams([['spectatorId', spectatorId]]);
    
    return axios.get(url + endpoint, { params });
}

