import CreateTeamForm from '../components/forms/CreateTeamForm';
import teamService from '../services/TeamService';
import AbstractAdminForm from '../components/layout/AbstractAdminForm';


function CreateTeam() {
    const promise = (data) => {
        return teamService.create(data.name, data.knowName, data.stadium)
    }

    return <AbstractAdminForm Children={CreateTeamForm} promise={promise} entityName={"Equipo"} />
}

export default CreateTeam;