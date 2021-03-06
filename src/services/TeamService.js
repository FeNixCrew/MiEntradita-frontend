import AbstractService from "./AbstractService";

class TeamService extends AbstractService{
    constructor(){
        super('/team')
    }

    async create(name, knowName, stadiumName, stadiumCapacity, stadiumLatitude, stadiumLongitude) {
        const endpoint = '/create'
        const newTeamRequest = { name, knowName, stadiumName, stadiumCapacity, stadiumLatitude, stadiumLongitude }
        return this.axios.post(this.path + endpoint, newTeamRequest)

    }

    async teams() {
        const endpoint = '/all'
        return this.axios.get(this.path + endpoint);
    }

    async details(teamName) {
        const endpoint = '/details';
        const params = new URLSearchParams([['teamName', teamName]]);
        return this.axios.get(this.path + endpoint, params);
    }

}

export default new TeamService();