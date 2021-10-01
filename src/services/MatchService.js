import AbstractService from './AbstractService';

class SpectatorService extends AbstractService {

    constructor() {
        super('/match');
    }

    async comeIn(spectatorId, matchId) {
        const endpoint = '/comeIn';
        const comeInRequest = {
            spectatorId,
            matchId
        }
        return this.axios.post(this.path + endpoint, comeInRequest);
    }
}

export default new SpectatorService();