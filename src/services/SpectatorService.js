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

    async pendingPayments() {
        const endpoint = '/tickets/pending-payment';
        const params = new URLSearchParams([['spectatorId', localStorage.spectatorId]]);

        return this.axios.get(this.path + endpoint, params);
    }

    async savePayment(ticketId, paymentId) {
        const endpoint = '/tickets/success';
        const successPaymentRequest = {
            spectatorId: localStorage.spectatorId,
            ticketId,
            paymentId
         };

        return this.axios.post(this.path + endpoint, successPaymentRequest);
    }

    async reserveTicket(matchId) {
        const endpoint = '/new-reserve';
        const params = new URLSearchParams([['spectatorId', localStorage.spectatorId], ['matchId', matchId]]);

        return this.axios.post(this.path + endpoint, params);
    }

    async getFavouriteTeam() {
        const endpoint = '/favourite'
        const params = new URLSearchParams([['spectatorId', localStorage.spectatorId]]);
        
        return this.axios.get(this.path + endpoint, params)
    }

    async markAsFavourite(teamId) {
        const endpoint = '/favourite';
        const params = new URLSearchParams([['spectatorId', localStorage.spectatorId], ['teamId', teamId]]);

        return this.axios.post(this.path + endpoint, params)
    }

    async nextMatches() {
        const endpoint = '/next-matches'
        const params = new URLSearchParams([['spectatorId', parseInt(localStorage.spectatorId)]]);
        
        return this.axios.get(this.path + endpoint, params)
    }
}

export default new SpectatorService();