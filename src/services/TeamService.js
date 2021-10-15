import AbstractService from "./AbstractService";


class TeamService extends AbstractService{
    constructor(){
        super('/team')
    }

    async create(name, knowName, stadium) {
        const endpoint = '/create'
        const newTeamRequest = { name, knowName, stadium }
        return this.axios.post(this.path + endpoint, newTeamRequest)

    }

    async teams() {
        const endpoint = '/all'
        return this.axios.get(this.path + endpoint);
    }

}

export default new TeamService();