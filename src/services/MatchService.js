import AbstractService from './AbstractService';

class SpectatorService extends AbstractService {

    constructor() {
        super('/match');
    }

    async create(home, away, ticketPrice, matchStartTime) {
        const endpoint = '/create'
        const newMatchRequest = { home, away, ticketPrice, matchStartTime }
        return this.axios.post(this.path + endpoint, newMatchRequest)
    }
    
    async comeIn(spectatorId, matchId) {
        const endpoint = '/comeIn';
        const comeInRequest = { spectatorId, matchId }
        return this.axios.post(this.path + endpoint, comeInRequest);
    }

    async search(partialTeamName) {
        const endpoint = '/search';
        const params = new URLSearchParams([['partialName', partialTeamName]]);
        return this.axios.get(this.path + endpoint, params);
    }
}

export default new SpectatorService();