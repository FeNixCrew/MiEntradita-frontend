import { useHistory } from 'react-router';
import Administrator from '../components/Administrator';
import BurgerMenu from '../components/navigation/BurgerMenu';
import Spectator from '../components/Spectator';
import { exit } from '../helpers/usedFunctions';

export default function Home() {
    const history = useHistory();

    const handleChildren = () => {
        const role = localStorage.role;
        return role === 'ROLE_ADMIN' ?
            <Administrator />
            :
            role === 'ROLE_USER' ?
                <Spectator />
                :
                exit(history);
    };

    return <BurgerMenu children={handleChildren()} />
}