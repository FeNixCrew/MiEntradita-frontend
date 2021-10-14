import AbstractService from "./AbstractService";


class TeamService extends AbstractService{
    constructor(){
        super('/team')
    }

    async teams() {
        const endpoint = '/all'
        return this.axios.get(this.path + endpoint);
    }

}

export default new TeamService();