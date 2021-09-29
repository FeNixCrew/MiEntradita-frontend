import axios from 'axios';

const url = 'http://localhost:8081/api'
const urlSpectator = url + '/spectator'
const urlAuth = url + '/auth'
const urlApi = url + '/match'


export const login = async (username, password) => {
    const endpoint = '/login';
    const data = {
        username: username,
        password: password
    }
    return axios.post(urlAuth + endpoint, data);
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


export const register = async (name, surname, username, email, dni, password) => {
    const endpoint = '/register';
    dni = parseInt(dni)
    const data = {
        name: name,
        surname: surname,
        username: username,
        password: password,
        dni: dni,
        email: email
    }
    return axios.post(urlAuth + endpoint, data)
}

