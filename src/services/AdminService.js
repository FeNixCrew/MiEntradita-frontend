import AbstractService from "./AbstractService";

class AdminService extends AbstractService {

    constructor() {
        super('/admin');
    }

    async getMatchAttendance(matchId) {
        const endpoint = '/match-attendance';
        const params = new URLSearchParams([['matchId', matchId]]);

        return this.axios.get(this.path + endpoint, params);
    }

}

export default new AdminService();