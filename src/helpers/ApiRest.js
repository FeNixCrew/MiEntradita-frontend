import axios from 'axios';

const url = 'http://localhost:8081/api'
const urlSpectator = url + '/spectator'
const urlApi = url + '/match'


export const login = async (username, password) => {
    const endpoint = '/login';
    const data = {
        username: username,
        password: password
    }
    return axios.post(urlSpectator + endpoint, data);
}

export const me = async () => {
    const endpoint = '/tickets';
    const spectatorId = localStorage.getItem('spectatorId');
    const params = new URLSearchParams([['spectatorId', spectatorId]]);

    return axios.get(urlSpectator + endpoint, { params });
}

export const comeIn = async (spectatorId, matchId) => {
    const endpoint = '/comeIn';
    const data = {
        spectatorId: spectatorId,
        matchId: matchId
    }
    return axios.post(urlApi + endpoint, data)
}

