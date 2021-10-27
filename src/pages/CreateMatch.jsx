import CreateMatchForm from '../components/forms/CreateMatchForm';
import matchService from '../services/MatchService';
import BurgerMenu from '../components/navigation/BurgerMenu';
import CreateEntity from '../components/layout/CreateEntityComponent';


function CreateMatchComponent() {

    const resultPromise = (data) => {
        let matchStartTime = (data.date + "T" + data.time);
        return matchService.create(data.home, data.away, parseInt(data.price), matchStartTime)
    }

    return <CreateEntity Children={CreateMatchForm} resultPromise={resultPromise} entityName={"Partido"} />
}

export default function CreateMatch() {
    return <BurgerMenu children={<CreateMatchComponent />} />
}