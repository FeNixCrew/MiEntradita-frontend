import { useHistory } from 'react-router';
import NavBar from '../components/navigation/NavBar';
import Admin from '../components/user/Admin'
import Spectator from '../components/user/Spectator';
import { exit } from '../helpers/usedFunctions';

export default function Home() {
    const history = useHistory();

    const switchRole = () => {
        switch (localStorage.role) {
            case "ROLE_ADMIN":
                return <Admin />
            case "ROLE_USER":
                return <Spectator />
            default:
                exit(history);
        }
    };

    return (
        <>
            <NavBar />
            {switchRole()}
        </>
    )
}