import { useHistory } from 'react-router';
import BurgerMenu from '../components/navigation/BurgerMenu';
import Searcher from '../components/search/Searcher';
import Spectator from '../components/Spectator';
import { exit } from '../helpers/usedFunctions';


export default function Home() {
    const history = useHistory();

    const handleChildren = () => {
        const role = localStorage.role;
        return role === 'ROLE_ADMIN' ?
            <Searcher/>
            :
            role === 'ROLE_USER' ?
                <Spectator />
                :
                exit(history);
    };

    return <BurgerMenu children={handleChildren()} />
}