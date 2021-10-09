import { useHistory } from 'react-router';
import BurgerMenu from '../components/navigation/BurgerMenu';
import Spectator from '../components/Spectator';
import { exit } from '../helpers/usedFunctions';
import { Searcher } from './Search';

export default function Home() {
    const history = useHistory();

    const handleChildren = () => {
        const role = localStorage.role;
        return  role === 'ROLE_ADMIN' ?
            <Searcher />
            :
            role === 'ROLE_USER' ?
                <Spectator />
                :
                exit(history);
    };

    return <BurgerMenu children={handleChildren()} />
}