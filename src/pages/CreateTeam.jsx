import BurgerMenu from '../components/navigation/BurgerMenu';
import CreateTeamForm from '../components/forms/CreateTeamForm';
import teamService from '../services/TeamService';
import CreateEntity from '../components/layout/CreateEntityComponent';


function CreateTeamComponent() {
    const resultPromise = (data) => {
        return teamService.create(data.name, data.knowName, data.stadium)
    }

    return <CreateEntity Children={CreateTeamForm} resultPromise={resultPromise} entityName={"Equipo"} />
}

export default function CreateTeam() {
    return <BurgerMenu children={<CreateTeamComponent />} />
}