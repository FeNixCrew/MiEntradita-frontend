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
    const header = { authorization: localStorage.getItem('auth') }

    return axios.get(urlSpectator + endpoint, { headers: header, params: params });
}

export const comeIn = async (spectatorId, matchId) => {
    const endpoint = '/comeIn';
    const header = {headers: { authorization: localStorage.getItem('auth') } }
    const data = {
        spectatorId: spectatorId,
        matchId: matchId
    }
    return axios.post(urlApi + endpoint, data, header)
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


export const createMatch = async (home, away, price, match_start_time) => {
    const endpoint = '/create'
    const header = { headers: { authorization: localStorage.getItem('auth') } }
    const data = {
        home: home,
        away: away,
        ticketPrice: price,
        matchStartTime: match_start_time
    }

    return axios.post(urlApi + endpoint, data, header)
}
