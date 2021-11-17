import CreateTeamForm from '../components/forms/CreateTeamForm';
import teamService from '../services/TeamService';
import AbstractAdminForm from '../components/layout/AbstractAdminForm';


function CreateTeam() {
    const promise = (data) => {
        return teamService.create(data.name, data.knowName, data.stadiumName, parseInt(data.stadiumCapacity), parseFloat(data.stadiumLatitude), parseFloat(data.stadiumLongitude))
    }

    return <AbstractAdminForm Children={CreateTeamForm} promise={promise} entityName={"Equipo"} />
}

export default CreateTeam;