import AbstractService from "./AbstractService";

class AdminService extends AbstractService {

    constructor() {
        super('/admin');
    }

    async getMatchAttendance(matchId, dniFilter = null) {
        const endpoint = '/match-attendance';
        let params;
        if(dniFilter !== null) params = new URLSearchParams([['matchId', matchId], ['dni', parseInt(dniFilter)]]);
        else params = new URLSearchParams([['matchId', matchId]]);

        return this.axios.get(this.path + endpoint, params);
    }

}

export default new AdminService();