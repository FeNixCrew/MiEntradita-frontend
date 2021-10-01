import AbstractService from "./AbstractService";

class AuthService extends AbstractService {

    constructor() {
        super('/auth');
    }
    
    async login(username, password) {
        const endpoint = '/login';
        const loginRequest = { username, password };

        return this.axios.post(this.path + endpoint, loginRequest);
    }

    async register(name, surname, username, email, dni, password) {
        const endpoint = '/register';
        const newSpectatorRequest = { name,surname, username, password, dni, email };
        return this.axios.post(this.path + endpoint, newSpectatorRequest)
    }
}

export default new AuthService();