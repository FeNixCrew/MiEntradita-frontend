import AbstractService from './AbstractService';

class SpectatorService extends AbstractService {

    constructor() {
        super('/spectator');
    }
    
    async pendingTickets() {
        const endpoint = '/tickets';
        const params = new URLSearchParams([['spectatorId', localStorage.spectatorId]]);

        return this.axios.get(this.path + endpoint, params);
    }
}

export default new SpectatorService();