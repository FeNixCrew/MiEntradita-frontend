import CreateMatchForm from '../components/forms/CreateMatchForm';
import matchService from '../services/MatchService';
import AbstractAdminForm from '../components/layout/AbstractAdminForm';


function CreateMatch() {

    const promise = (data) => {
        let matchStartTime = (data.date + "T" + data.time);
        return matchService.create(data.home, data.away, parseInt(data.price), matchStartTime)
    }

    return <AbstractAdminForm Children={CreateMatchForm} promise={promise} entityName={"Partido"} />
}

export default CreateMatch;
